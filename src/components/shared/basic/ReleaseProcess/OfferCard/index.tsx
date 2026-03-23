/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import {
  IconButton,
  type UploadFileStatus,
  UploadStatus,
} from '@arena2036/portal-shared-components-construct-x'
import { useTranslation } from 'react-i18next'
import { Grid } from '@mui/material'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import '../ReleaseProcessSteps.scss'
import { useDispatch, useSelector } from 'react-redux'
import SnackbarNotificationWithButtons from '../components/SnackbarNotificationWithButtons'
import ConnectorFormInputFieldShortAndLongDescription from '../components/ConnectorFormInputFieldShortAndLongDescription'
import CommonConnectorFormInputField from '../components/CommonConnectorFormInputField'
import ConnectorFormInputFieldImage from '../components/ConnectorFormInputFieldImage'
import Patterns from 'types/Patterns'
import ReleaseStepHeader from '../components/ReleaseStepHeader'
import type { DropzoneFile } from 'components/shared/basic/Dropzone'
import { isString } from 'lodash'
import { ConnectorFormInputField } from '../components/ConnectorFormInputField'
import type { LanguageStatusType } from 'features/appManagement/types'
import {
  serviceIdSelector,
  serviceStatusDataSelector,
  serviceReleaseStepIncrement,
  serviceRedirectStatusSelector,
} from 'features/serviceManagement/slice'
import {
  type CreateServiceStep1Item,
  type ServiceTypeIdsType,
  useCreateServiceMutation,
  useDeleteDocumentMutation,
  useFetchDocumentMutation,
  useFetchServiceStatusQuery,
  useFetchServiceTypeIdsQuery,
  useSaveServiceMutation,
  useUpdateServiceDocumentUploadMutation,
} from 'features/serviceManagement/apiSlice'
import {
  setServiceId,
  setServiceStatus,
} from 'features/serviceManagement/actions'
import { ButtonLabelTypes } from '..'
import RetryOverlay from '../components/RetryOverlay'
import { success, error } from 'services/NotifyService'
import { DocumentTypeId } from 'features/appManagement/apiSlice'
import { PAGES } from 'types/Constants'
import { download } from 'utils/downloadUtils'
import { extractFileData } from 'utils/fileUtils'
import { isStepCompleted } from '../OfferStepHelper'

type FormDataType = {
  title: string
  serviceTypeIds: string[]
  shortDescriptionEN: string
  shortDescriptionDE: string
  uploadImage: {
    leadPictureUri: DropzoneFile | string | null
    alt?: string
  }
  price: string | null
}

export default function OfferCard() {
  const { t } = useTranslation('servicerelease')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const serviceId = useSelector(serviceIdSelector)
  const redirectStatus = useSelector(serviceRedirectStatusSelector)
  const [serviceCardNotification, setServiceCardNotification] = useState(false)
  const [serviceCardSnackbar, setServiceCardSnackbar] = useState<boolean>(false)
  const serviceStatusData = useSelector(serviceStatusDataSelector)
  const [fetchDocumentById] = useFetchDocumentMutation()
  const {
    data: fetchServiceStatus,
    isError,
    refetch,
  } = useFetchServiceStatusQuery(serviceId ?? '', {
    refetchOnMountOrArgChange: true,
  })
  const [createService] = useCreateServiceMutation()
  const [saveService] = useSaveServiceMutation()
  const [defaultServiceTypeVal, setDefaultServiceTypeVal] = useState<
    ServiceTypeIdsType[]
  >([])
  const serviceTypeData = useFetchServiceTypeIdsQuery()
  const serviceTypeIds = useMemo(() => serviceTypeData.data, [serviceTypeData])
  const [loading, setLoading] = useState<boolean>(false)
  const [showRetryOverlay, setShowRetryOverlay] = useState<boolean>(false)
  const [imageData, setImageData] = useState({})
  const [deleteDocument, deleteResponse] = useDeleteDocumentMutation()
  const [updateServiceDocumentUpload] = useUpdateServiceDocumentUploadMutation()
  const hasDispatched = useRef(false)

  useEffect(() => {
    setShowRetryOverlay(serviceId && isError ? true : false)
  }, [serviceId, isError])

  useEffect(() => {
    deleteResponse.isSuccess && success(t('documentDeleteSuccess'))
    deleteResponse.isError && error(t('documentDeleteError'))
  }, [deleteResponse, t])

  const defaultValues = useMemo(() => {
    return {
      title: fetchServiceStatus?.title,
      serviceTypeIds: fetchServiceStatus?.serviceTypeIds,
      price: null,
      shortDescriptionEN:
        fetchServiceStatus?.descriptions?.filter(
          (serviceStatus: LanguageStatusType) =>
            serviceStatus.languageCode === 'en'
        )[0]?.shortDescription ?? '',
      shortDescriptionDE:
        fetchServiceStatus?.descriptions?.filter(
          (serviceStatus: LanguageStatusType) =>
            serviceStatus.languageCode === 'de'
        )[0]?.shortDescription ?? '',
      uploadImage: {
        leadPictureUri: imageData,
        alt: fetchServiceStatus?.leadPictureUri ?? '',
      },
    }
  }, [fetchServiceStatus])

  const {
    handleSubmit,
    getValues,
    control,
    trigger,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues,
    mode: 'onChange',
  })

  const fetchCardImage = useCallback(
    async (documentId: string, documentName: string) => {
      try {
        await fetchDocumentById({
          appId: serviceId,
          documentId,
        }).unwrap()
        const setFileStatus = (status: UploadFileStatus) => {
          setValue('uploadImage.leadPictureUri', {
            name: documentName,
            id: documentId,
            status,
          } as unknown as string)
        }
        setFileStatus(UploadStatus.UPLOAD_SUCCESS)
        setImageData({
          name: documentName,
          id: documentId,
          status: UploadStatus.UPLOAD_SUCCESS,
        })
      } catch (error) {
        console.error(error, 'ERROR WHILE FETCHING IMAGE')
      }
    },
    [fetchDocumentById, serviceId, setValue]
  )

  const handleDownload = async (documentName: string, documentId: string) => {
    if (fetchDocumentById)
      try {
        const response = await fetchDocumentById({
          appId: serviceId,
          documentId,
        }).unwrap()

        const { fileType, file } = extractFileData(response)

        download(file, fileType, documentName)
      } catch (error) {
        console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
      }
  }

  useEffect(() => {
    if (serviceStatusData?.documents?.SERVICE_LEADIMAGE?.[0].documentId) {
      fetchCardImage(
        serviceStatusData?.documents?.SERVICE_LEADIMAGE[0].documentId,
        serviceStatusData?.documents?.SERVICE_LEADIMAGE[0].documentName
      )
    }
    if (serviceStatusData?.serviceTypeIds) {
      setDefaultServiceTypeVal(
        serviceStatusData?.serviceTypeIds.map((item: string, index: number) => {
          return {
            name: item,
            serviceTypeId: index,
          }
        })
      )
    }
  }, [serviceStatusData, fetchCardImage])

  const handleUploadDocument = (
    appId: string,
    uploadImageValue: DropzoneFile
  ) => {
    const setFileStatus = (status: UploadFileStatus) => {
      setValue('uploadImage.leadPictureUri', {
        id: uploadImageValue.id,
        name: uploadImageValue.name,
        size: uploadImageValue.size,
        status,
      } as unknown as string)
    }

    setFileStatus(UploadStatus.UPLOADING)
    updateServiceDocumentUpload({
      appId,
      documentTypeId: DocumentTypeId.SERVICE_LEADIMAGE,
      body: { file: uploadImageValue },
    })
      .then(() => {
        setFileStatus(UploadStatus.UPLOAD_SUCCESS)
      })
      .catch(() => {
        setFileStatus(UploadStatus.UPLOAD_ERROR)
      })
  }

  useEffect(() => {
    if (fetchServiceStatus) dispatch(setServiceStatus(fetchServiceStatus))
    reset(defaultValues)
  }, [dispatch, fetchServiceStatus, defaultValues, reset])

  useEffect(() => {
    if (hasDispatched.current) return
    if (
      fetchServiceStatus &&
      isStepCompleted(fetchServiceStatus, 1, redirectStatus)
    ) {
      dispatch(serviceReleaseStepIncrement())
      hasDispatched.current = true
    }
  }, [fetchServiceStatus, hasDispatched])

  const handleSave = async (
    apiBody: CreateServiceStep1Item,
    buttonLabel: string
  ) => {
    const uploadImageValue =
      getValues().uploadImage &&
      (getValues().uploadImage.leadPictureUri as unknown as DropzoneFile)
    await saveService({
      id: serviceId,
      body: apiBody,
    })
      .unwrap()
      .then(() => {
        if (uploadImageValue) {
          !uploadImageValue.id &&
            handleUploadDocument(serviceId, uploadImageValue)
        }
        dispatch(setServiceId(serviceId))
        buttonLabel === ButtonLabelTypes.SAVE_AND_PROCEED &&
          dispatch(serviceReleaseStepIncrement())
        buttonLabel === ButtonLabelTypes.SAVE && setServiceCardSnackbar(true)
        if (fetchServiceStatus) dispatch(setServiceStatus(fetchServiceStatus))
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setServiceCardNotification(true)
      })
  }

  const handleCreate = async (
    apiBody: CreateServiceStep1Item,
    buttonLabel: string
  ) => {
    const uploadImageValue =
      getValues().uploadImage &&
      (getValues().uploadImage.leadPictureUri as unknown as DropzoneFile)
    await createService({
      id: '',
      body: apiBody,
    })
      .unwrap()
      .then((result) => {
        if (isString(result)) {
          if (uploadImageValue) {
            !uploadImageValue.id &&
              handleUploadDocument(result, uploadImageValue)
          }
          dispatch(setServiceId(result))
          buttonLabel === ButtonLabelTypes.SAVE_AND_PROCEED &&
            dispatch(serviceReleaseStepIncrement())
          buttonLabel === ButtonLabelTypes.SAVE && setServiceCardSnackbar(true)
        }
      })
      .catch(() => {
        setServiceCardNotification(true)
      })
    setLoading(false)
  }

  const onSubmit = async (data: FormDataType, buttonLabel: string) => {
    const validateFields = await trigger([
      'title',
      'serviceTypeIds',
      'shortDescriptionEN',
      'shortDescriptionDE',
    ])
    const apiBody = {
      serviceTypeIds: data.serviceTypeIds,
      title: data.title,
      leadPictureUri: data.uploadImage?.leadPictureUri
        ? data.uploadImage.leadPictureUri !== null &&
          Object.keys(data.uploadImage.leadPictureUri).length > 0 &&
          Object.values(data.uploadImage.leadPictureUri)[0]
        : '',
      descriptions: [
        {
          languageCode: 'de',
          longDescription:
            serviceStatusData?.descriptions?.filter(
              (serviceStatus: LanguageStatusType) =>
                serviceStatus.languageCode === 'de'
            )[0]?.longDescription ?? '',
          shortDescription: data.shortDescriptionDE ?? '',
        },
        {
          languageCode: 'en',
          longDescription:
            serviceStatusData?.descriptions?.filter(
              (serviceStatus: LanguageStatusType) =>
                serviceStatus.languageCode === 'en'
            )[0]?.longDescription ?? '',
          shortDescription: data.shortDescriptionEN ?? '',
        },
      ],
      privacyPolicies: [],
      salesManager: null,
      price: '',
      providerUri: serviceStatusData?.providerUri ?? '',
      contactEmail: serviceStatusData?.contactEmail ?? '',
    }
    if (validateFields) {
      setLoading(true)
      if (serviceId) {
        void handleSave(apiBody, buttonLabel)
      } else {
        void handleCreate(apiBody, buttonLabel)
      }
    }
  }

  return (
    <div className="app-market-card">
      <RetryOverlay
        openDialog={showRetryOverlay}
        handleOverlayClose={() => {
          setShowRetryOverlay(false)
          navigate(-1)
        }}
        handleConfirmClick={() => {
          refetch()
          setShowRetryOverlay(false)
        }}
        title={t('retryOverlay.title')}
        description={t('retryOverlay.description')}
      />
      <ReleaseStepHeader
        title={t('step1.headerTitle')}
        description={t('step1.headerDescription')}
      />
      <Grid container spacing={2}>
        <Grid item md={8} sx={{ mt: 0, mr: 'auto', mb: 0, ml: 'auto' }}>
          <form>
            <CommonConnectorFormInputField
              {...{
                control,
                trigger,
                errors,
              }}
              name="title"
              pattern={Patterns.offerCard.serviceName}
              label={
                <>
                  {t('step1.serviceName')}
                  <span style={{ color: 'red' }}> *</span>
                </>
              }
              rules={{
                required: `${t('step1.serviceName')} ${t(
                  'serviceReleaseForm.isMandatory'
                )}`,
                minLength: `${t('serviceReleaseForm.minimum')} 3 ${t(
                  'serviceReleaseForm.charactersRequired'
                )}`,
                pattern: `${t(
                  'serviceReleaseForm.validCharactersIncludes'
                )} A-Za-z0-9.:_- @&`,
                maxLength: `${t('serviceReleaseForm.maximum')} 20 ${t(
                  'serviceReleaseForm.charactersAllowed'
                )}`,
              }}
              maxLength={20}
              minLength={3}
            />

            <div className="form-field">
              <ConnectorFormInputField
                {...{
                  control,
                  trigger,
                  errors,
                  name: 'serviceTypeIds',
                  label: (
                    <>
                      {t('step1.serviceType')}
                      <span style={{ color: 'red' }}> *</span>
                    </>
                  ),
                  placeholder: t('step1.serviceTypePlaceholder'),
                  type: 'multiSelectList',
                  rules: {
                    required: {
                      value: true,
                      message: `${t('step1.serviceType')} ${t(
                        'serviceReleaseForm.isMandatory'
                      )}`,
                    },
                    pattern: {
                      value: Patterns.offerCard.serviceType,
                      message: `${t(
                        'serviceReleaseForm.validCharactersIncludes'
                      )} A-Za-z`,
                    },
                  },
                  items: serviceTypeIds ?? [],
                  keyTitle: 'name',
                  saveKeyTitle: 'name',
                  notItemsText: t('serviceReleaseForm.noItemsSelected'),
                  buttonAddMore: t('serviceReleaseForm.addMore'),
                  defaultValues: defaultServiceTypeVal,
                }}
              />
            </div>

            <div className="form-field">
              {['shortDescriptionEN', 'shortDescriptionDE'].map(
                (desc: string) => (
                  <div key={desc}>
                    <ConnectorFormInputFieldShortAndLongDescription
                      {...{
                        control,
                        trigger,
                        errors,
                      }}
                      item={desc}
                      label={
                        <>
                          {t(`step1.${desc}`)}
                          <span style={{ color: 'red' }}> *</span>
                          <IconButton sx={{ color: '#939393' }} size="small">
                            <HelpOutlineIcon />
                          </IconButton>
                        </>
                      }
                      value={
                        (desc === 'shortDescriptionEN'
                          ? getValues().shortDescriptionEN.length
                          : getValues().shortDescriptionDE.length) + '/120'
                      }
                      patternKey="shortDescription"
                      patternEN={Patterns.offerCard.shortDescription}
                      patternDE={Patterns.offerCard.shortDescription}
                      isRequired={true}
                      rules={{
                        required:
                          t(`step1.${desc}`) +
                          t('serviceReleaseForm.isMandatory'),
                        minLength: `${t('serviceReleaseForm.minimum')} 10 ${t(
                          'serviceReleaseForm.charactersRequired'
                        )}`,
                        pattern: `${t(
                          'serviceReleaseForm.validCharactersIncludes'
                        )} ${'a-zA-ZÀ-ÿ0-9 !?@&#\'"()_-=/*.,;:'}
                        ${t('serviceReleaseForm.spaceAloneNotAllowed')}`,
                        maxLength: `${t('serviceReleaseForm.maximum')} 120 ${t(
                          'serviceReleaseForm.charactersAllowed'
                        )}`,
                      }}
                      maxLength={120}
                      minLength={10}
                    />
                  </div>
                )
              )}
            </div>

            <ConnectorFormInputFieldImage
              {...{
                control,
                trigger,
                errors,
              }}
              label={t('step1.serviceLeadImageUpload')}
              noteDescription={t('serviceReleaseForm.OnlyOneFileAllowed')}
              note={t('serviceReleaseForm.note')}
              requiredText={t('serviceReleaseForm.fileUploadIsMandatory')}
              isRequired={false}
              handleDownload={handleDownload}
              handleDelete={(documentId: string) => {
                setImageData({})
                documentId && deleteDocument(documentId)
              }}
            />
          </form>
        </Grid>
      </Grid>
      <SnackbarNotificationWithButtons
        pageNotification={serviceCardNotification}
        pageSnackbar={serviceCardSnackbar}
        pageSnackBarDescription={t(
          'serviceReleaseForm.dataSavedSuccessMessage'
        )}
        pageNotificationsObject={{
          title: t('serviceReleaseForm.error.title'),
          description: t('serviceReleaseForm.error.message'),
        }}
        setPageNotification={() => {
          setServiceCardNotification(false)
        }}
        setPageSnackbar={() => {
          setServiceCardSnackbar(false)
        }}
        onBackIconClick={() => {
          navigate(`/${PAGES.SERVICE_MANAGEMENT}`)
        }}
        // Add an ESLint exception until there is a solution
        // eslint-disable-next-line
        onSave={handleSubmit((data: any) =>
          onSubmit(data, ButtonLabelTypes.SAVE)
        )}
        // Add an ESLint exception until there is a solution
        // eslint-disable-next-line
        onSaveAndProceed={handleSubmit((data: any) =>
          onSubmit(data, ButtonLabelTypes.SAVE_AND_PROCEED)
        )}
        isValid={isValid}
        loader={loading}
        helpUrl={
          '/documentation/?path=user%2F05.+Service%28s%29%2F02.+Service+Release+Process%2F01.+Service+Card.md'
        }
      />
    </div>
  )
}
