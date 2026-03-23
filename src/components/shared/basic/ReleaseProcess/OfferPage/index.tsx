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
  Typography,
  IconButton,
  type UploadFileStatus,
  UploadStatus,
} from '@arena2036/portal-shared-components-construct-x'
import { useTranslation } from 'react-i18next'
import { Divider, InputLabel } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Controller, useForm } from 'react-hook-form'
import Patterns from 'types/Patterns'
import { useEffect, useMemo, useRef, useState } from 'react'
import '../ReleaseProcessSteps.scss'
import { useSelector, useDispatch } from 'react-redux'
import {
  ServiceTypeIdsEnum,
  useDeleteDocumentMutation,
  useFetchServiceStatusQuery,
  useSaveServiceMutation,
  useUpdateServiceDocumentUploadMutation,
  useFetchDocumentMutation,
} from 'features/serviceManagement/apiSlice'
import { Dropzone, type DropzoneFile } from 'components/shared/basic/Dropzone'
import SnackbarNotificationWithButtons from '../components/SnackbarNotificationWithButtons'
import { setServiceStatus } from 'features/serviceManagement/actions'
import {
  serviceIdSelector,
  serviceReleaseStepIncrement,
  serviceReleaseStepDecrement,
  setServiceRedirectStatus,
  serviceRedirectStatusSelector,
} from 'features/serviceManagement/slice'
import ReleaseStepHeader from '../components/ReleaseStepHeader'
import ConnectorFormInputFieldShortAndLongDescription from '../components/ConnectorFormInputFieldShortAndLongDescription'
import ProviderConnectorField from '../components/ProviderConnectorField'
import type { LanguageStatusType } from 'features/appManagement/types'
import { DocumentTypeId } from 'features/appManagement/apiSlice'
import { ButtonLabelTypes } from '..'
import { success, error } from 'services/NotifyService'
import { download } from 'utils/downloadUtils'
import { type FileState } from 'features/serviceManagement/types'
import { ALLOWED_MAX_SIZE_DOCUMENT } from 'types/Constants'
import { extractFileData } from 'utils/fileUtils'
import { isStepCompleted } from '../OfferStepHelper'

type FormDataType = {
  longDescriptionEN: string
  longDescriptionDE: string
  images: []
  providerHomePage: string
  providerContactEmail: string
}

export default function OfferPage({
  skipTechnicalIntegrationStep,
}: {
  skipTechnicalIntegrationStep: (val: boolean) => void
}) {
  const { t } = useTranslation('servicerelease')
  const [appPageNotification, setServicePageNotification] = useState(false)
  const [appPageSnackbar, setServicePageSnackbar] = useState<boolean>(false)
  const dispatch = useDispatch()
  const serviceId = useSelector(serviceIdSelector)
  const redirectStatus = useSelector(serviceRedirectStatusSelector)
  const hasDispatched = useRef(false)
  const longDescriptionMaxLength = 2000
  const { data: fetchServiceStatus, refetch } = useFetchServiceStatusQuery(
    serviceId ?? ' ',
    {
      refetchOnMountOrArgChange: true,
    }
  )
  const [saveService] = useSaveServiceMutation()
  const [updateDocumentUpload] = useUpdateServiceDocumentUploadMutation()
  const [loading, setLoading] = useState<boolean>(false)
  const [deleteDocument, deleteResponse] = useDeleteDocumentMutation()
  const [fetchDocumentById] = useFetchDocumentMutation()

  useEffect(() => {
    if (fetchServiceStatus) dispatch(setServiceStatus(fetchServiceStatus))
    skipTechnicalIntegrationStep(
      !fetchServiceStatus?.serviceTypeIds.includes(
        ServiceTypeIdsEnum.DATASPACE_SERVICE
      )
    )
  }, [dispatch, fetchServiceStatus, skipTechnicalIntegrationStep])

  const onBackIconClick = () => {
    if (fetchServiceStatus) dispatch(setServiceStatus(fetchServiceStatus))
    dispatch(setServiceRedirectStatus(false))
    dispatch(serviceReleaseStepDecrement())
  }

  useEffect(() => {
    deleteResponse.isSuccess && success(t('documentDeleteSuccess'))
    deleteResponse.isError && error(t('documentDeleteError'))
  }, [deleteResponse, t])

  const defaultValues = useMemo(() => {
    return {
      longDescriptionEN:
        fetchServiceStatus?.descriptions?.filter(
          (appStatus: LanguageStatusType) => appStatus.languageCode === 'en'
        )[0]?.longDescription ?? '',
      longDescriptionDE:
        fetchServiceStatus?.descriptions?.filter(
          (appStatus: LanguageStatusType) => appStatus.languageCode === 'de'
        )[0]?.longDescription ?? '',
      images: fetchServiceStatus?.documents?.ADDITIONAL_DETAILS ?? [],
      providerHomePage: fetchServiceStatus?.providerUri ?? '',
      providerContactEmail: fetchServiceStatus?.contactEmail ?? '',
    }
  }, [fetchServiceStatus])

  const {
    handleSubmit,
    getValues,
    control,
    trigger,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    mode: 'onChange',
  })

  const dImages = useMemo(() => defaultValues.images, [defaultValues])

  useEffect(() => {
    const imgs = dImages?.map(
      (item: { documentName: string; documentId: string }) => {
        return {
          name: item.documentName,
          status: UploadStatus.UPLOAD_SUCCESS,
          id: item.documentId,
        }
      }
    )

    if (imgs.length > 0) {
      const setFiles = (fileIndex: number, status: UploadFileStatus) => {
        const files = imgs
        files[fileIndex] = {
          name: imgs[fileIndex].name,
          status,
          id: imgs[fileIndex].id,
        }
        setValue('images', files)
      }

      for (let fileIndex = 0; fileIndex < imgs.length; fileIndex++) {
        setFiles(fileIndex, UploadStatus.UPLOAD_SUCCESS)
      }
    }
  }, [dImages, setValue])

  const uploadImage = (files: DropzoneFile[]) => {
    const value = files
    if (value.length > 0) {
      const setFiles = (fileIndex: number, status: UploadFileStatus) => {
        // Add an ESLint exception until there is a solution
        // eslint-disable-next-line
        const files = [...getValues().images] as any[]
        files[fileIndex] = {
          name: value[fileIndex].name,
          size: value[fileIndex].size,
          status,
        }
        setValue('images', files as unknown)
      }

      for (let fileIndex = 0; fileIndex < value.length; fileIndex++) {
        setFiles(fileIndex, UploadStatus.UPLOADING)
        uploadDocument(
          serviceId,
          DocumentTypeId.ADDITIONAL_DETAILS,
          value[fileIndex]
        )
          .then(() => {
            refetch()
            setFiles(fileIndex, UploadStatus.UPLOAD_SUCCESS)
          })
          .catch(() => {
            setFiles(fileIndex, UploadStatus.UPLOAD_ERROR)
          })
      }
    }
  }

  const uploadDocument = async (
    appId: string,
    documentTypeId: DocumentTypeId,
    file: DropzoneFile
  ) => {
    const data = {
      appId,
      documentTypeId,
      body: { file },
    }

    return await updateDocumentUpload(data).unwrap()
  }

  const onSubmit = async (data: FormDataType, buttonLabel: string) => {
    const validateFields = await trigger([
      'longDescriptionEN',
      'longDescriptionDE',
      'providerHomePage',
      'providerContactEmail',
    ])
    if (validateFields) {
      setLoading(true)
      void handleSave(data, buttonLabel)
    }
  }

  const handleSave = async (data: FormDataType, buttonLabel: string) => {
    const apiBody = {
      title: fetchServiceStatus?.title,
      serviceTypeIds: fetchServiceStatus?.serviceTypeIds,
      descriptions: [
        {
          languageCode: 'en',
          longDescription: data.longDescriptionEN,
          shortDescription:
            fetchServiceStatus?.descriptions?.filter(
              (appStatus: LanguageStatusType) => appStatus.languageCode === 'en'
            )[0]?.shortDescription ?? '',
        },
        {
          languageCode: 'de',
          longDescription: data.longDescriptionDE,
          shortDescription:
            fetchServiceStatus?.descriptions?.filter(
              (appStatus: LanguageStatusType) => appStatus.languageCode === 'de'
            )[0]?.shortDescription ?? '',
        },
      ],
      privacyPolicies: [],
      salesManager: null,
      price: '',
      providerUri: data.providerHomePage ?? '',
      contactEmail: data.providerContactEmail ?? '',
      leadPictureUri: fetchServiceStatus?.leadPictureUri,
    }

    try {
      await saveService({
        id: serviceId,
        body: apiBody,
      }).unwrap()
      buttonLabel === ButtonLabelTypes.SAVE_AND_PROCEED &&
        dispatch(serviceReleaseStepIncrement())
      buttonLabel === ButtonLabelTypes.SAVE && setServicePageSnackbar(true)
      refetch()
    } catch (error) {
      setServicePageNotification(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (hasDispatched.current) return
    if (
      fetchServiceStatus &&
      isStepCompleted(fetchServiceStatus, 2, redirectStatus)
    ) {
      dispatch(serviceReleaseStepIncrement())
      hasDispatched.current = true
    }
  }, [fetchServiceStatus, hasDispatched])

  const handleDownload = async (value: FileState[]) => {
    const documentId = value[0].id
    const documentName = value[0].name
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

  return (
    <div className="app-page">
      <ReleaseStepHeader
        title={t('step2.headerTitle')}
        description={t('step2.headerDescription')}
      />
      <form className="header-description">
        <div className="form-field">
          {['longDescriptionEN', 'longDescriptionDE'].map(
            (longDesc: string) => (
              <div key={longDesc}>
                <ConnectorFormInputFieldShortAndLongDescription
                  {...{
                    control,
                    trigger,
                    errors,
                  }}
                  item={longDesc}
                  label={
                    <>
                      {t(`step2.${longDesc}`)}
                      <span style={{ color: 'red' }}> *</span>
                      <IconButton sx={{ color: '#939393' }} size="small">
                        <HelpOutlineIcon />
                      </IconButton>
                    </>
                  }
                  value={
                    (longDesc === 'longDescriptionEN'
                      ? getValues().longDescriptionEN.length
                      : getValues().longDescriptionDE.length) +
                    `/${longDescriptionMaxLength}`
                  }
                  patternKey="longDescriptionEN"
                  patternEN={Patterns.offerPage.longDescription}
                  patternDE={Patterns.offerPage.longDescription}
                  rules={{
                    maxLength: `${t(
                      'serviceReleaseForm.maximum'
                    )} ${longDescriptionMaxLength} ${t(
                      'serviceReleaseForm.charactersAllowed'
                    )}`,
                    required:
                      t(`step2.${longDesc}`) +
                      t('serviceReleaseForm.isMandatory'),
                    minLength: `${t('serviceReleaseForm.minimum')} 10 ${t(
                      'serviceReleaseForm.charactersRequired'
                    )}`,
                    pattern: `${t(
                      'serviceReleaseForm.validCharactersIncludes'
                    )} ${'a-zA-ZÀ-ÿ0-9 !?@&#\'"()[]_-+=<>/*.,;:'} 
                    ${t('serviceReleaseForm.spaceAloneNotAllowed')}`,
                  }}
                  maxLength={longDescriptionMaxLength}
                />
              </div>
            )
          )}
        </div>

        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <div className="form-field">
          <InputLabel sx={{ mb: 3, mt: 3 }}>{t('step2.doc')}</InputLabel>
          <Controller
            name="images"
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange: reactHookFormOnChange, value } }) => {
              return (
                <Dropzone
                  files={value}
                  onChange={(files, addedFiles) => {
                    reactHookFormOnChange(files)
                    trigger('images')
                    addedFiles && uploadImage(files)
                  }}
                  acceptFormat={{
                    'application/pdf': ['.pdf'],
                  }}
                  maxFilesToUpload={1}
                  maxFileSize={ALLOWED_MAX_SIZE_DOCUMENT}
                  handleDownload={() => handleDownload(value)}
                  handleDelete={(documentId: string) => {
                    documentId && deleteDocument(documentId)
                  }}
                />
              )
            }}
          />
          <Typography variant="body2" mt={3} sx={{ fontWeight: 'bold' }}>
            {t('serviceReleaseForm.note')}
          </Typography>
          <Typography variant="body2" mb={3}>
            {t('serviceReleaseForm.max1Images')}
          </Typography>
        </div>

        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <InputLabel sx={{ mb: 3 }}>{t('step2.providerDetails')}</InputLabel>
        <div className="form-field">
          <ProviderConnectorField
            {...{
              control,
              trigger,
              errors,
            }}
            name="providerHomePage"
            label={t('step2.providerHomePage')}
            pattern={Patterns.URL}
            ruleMessage={t('step2.pleaseEnterValidHomePageURL')}
          />
        </div>

        <div className="form-field">
          <ProviderConnectorField
            {...{
              control,
              trigger,
              errors,
            }}
            name="providerContactEmail"
            label={t('step2.providerContactEmail')}
            pattern={Patterns.MAIL}
            ruleMessage={t('step2.pleaseEnterValidEmail')}
          />
        </div>
      </form>
      <SnackbarNotificationWithButtons
        pageNotification={appPageNotification}
        pageSnackBarDescription={t(
          'serviceReleaseForm.dataSavedSuccessMessage'
        )}
        pageNotificationsObject={{
          title: t('serviceReleaseForm.error.title'),
          description: t('serviceReleaseForm.error.message'),
        }}
        pageSnackbar={appPageSnackbar}
        setPageNotification={() => {
          setServicePageNotification(false)
        }}
        setPageSnackbar={() => {
          setServicePageSnackbar(false)
        }}
        onBackIconClick={onBackIconClick}
        onSave={handleSubmit((data) => onSubmit(data, ButtonLabelTypes.SAVE))}
        onSaveAndProceed={handleSubmit((data) =>
          onSubmit(data, ButtonLabelTypes.SAVE_AND_PROCEED)
        )}
        isValid={isValid}
        loader={loading}
        helpUrl={
          '/documentation/?path=user%2F05.+Service%28s%29%2F02.+Service+Release+Process%2F02.+Service+Detail+Page.md'
        }
      />
    </div>
  )
}
