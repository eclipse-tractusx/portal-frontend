/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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
  LogoGrayData,
  UploadFileStatus,
  UploadStatus,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { Grid } from '@mui/material'
import { useState, useEffect, useCallback, useMemo } from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import {
  useFetchServiceStatusQuery,
  useFetchDocumentByIdMutation,
  useCreateServiceMutation,
  useSaveServiceMutation,
  useUpdateDocumentUploadMutation,
  CreateServiceStep1Item,
} from 'features/appManagement/apiSlice'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import '../ReleaseProcessSteps.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  appIdSelector,
  increment,
  serviceStatusDataSelector,
} from 'features/appManagement/slice'
import { setAppId, setServiceStatus } from 'features/appManagement/actions'
import SnackbarNotificationWithButtons from '../SnackbarNotificationWithButtons'
import ConnectorFormInputFieldShortAndLongDescription from '../components/ConnectorFormInputFieldShortAndLongDescription'
import CommonConnectorFormInputField from '../components/CommonConnectorFormInputField'
import ConnectorFormInputFieldImage from '../components/ConnectorFormInputFieldImage'
import Patterns from 'types/Patterns'
import ReleaseStepHeader from '../components/ReleaseStepHeader'
import { DropzoneFile } from 'components/shared/basic/Dropzone'
import { isString } from 'lodash'
import { ConnectorFormInputField } from '../components/ConnectorFormInputField'

type FormDataType = {
  title: string
  serviceTypeIds: string[]
  shortDescriptionEN: string
  shortDescriptionDE: string
  uploadImage: {
    leadPictureUri: DropzoneFile | string | null
    alt?: string
  }
}

export default function OfferCard() {
  const { t } = useTranslation('servicerelease')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const appId = useSelector(appIdSelector)
  const [serviceCardNotification, setServiceCardNotification] = useState(false)
  const [serviceCardSnackbar, setServiceCardSnackbar] = useState<boolean>(false)
  const serviceStatusData = useSelector(serviceStatusDataSelector)
  const [fetchDocumentById] = useFetchDocumentByIdMutation()
  const [cardImage, setCardImage] = useState(LogoGrayData)
  const fetchServiceStatus = useFetchServiceStatusQuery(
    'c1b1ebc7-e92d-4ca8-8484-8810547d7d49' ?? '',
    {
      refetchOnMountOrArgChange: true,
    }
  ).data
  const [createService] = useCreateServiceMutation()
  const [saveService] = useSaveServiceMutation()
  const [updateDocumentUpload] = useUpdateDocumentUploadMutation()
  const [defaultServiceTypeVal, setDefaultServiceTypeVal] = useState<any>([])

  const commonServiceTypeIds = useMemo(() => {
    return [
      {
        name: 'DATASPACE_SERVICE',
      },
      {
        name: 'CONSULTANT_SERVICE',
      },
    ]
  }, [])

  const defaultValues = useMemo(() => {
    return {
      title: fetchServiceStatus?.title,
      serviceTypeIds: fetchServiceStatus?.serviceTypeIds.map((item: string) => {
        return {
          name: item,
        }
      }),
      price: null,
      shortDescriptionEN:
        fetchServiceStatus?.descriptions?.filter(
          (serviceStatus: any) => serviceStatus.languageCode === 'en'
        )[0]?.shortDescription || '',
      shortDescriptionDE:
        fetchServiceStatus?.descriptions?.filter(
          (serviceStatus: any) => serviceStatus.languageCode === 'de'
        )[0]?.shortDescription || '',
      uploadImage: {
        leadPictureUri: cardImage === LogoGrayData ? null : cardImage,
        alt: fetchServiceStatus?.leadPictureUri || '',
      },
    }
  }, [fetchServiceStatus, cardImage])

  const {
    handleSubmit,
    getValues,
    control,
    trigger,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const offerImageData: any = getValues().uploadImage.leadPictureUri

  useEffect(() => {
    if (offerImageData !== null && offerImageData !== LogoGrayData) {
      let isFile: any = offerImageData instanceof File
      if (isFile) {
        const blobFile = new Blob([offerImageData], {
          type: 'image/png',
        })
        setCardImage(URL.createObjectURL(blobFile))
      }
    }
  }, [offerImageData])

  const fetchCardImage = useCallback(
    async (documentId: string, documentName: string) => {
      try {
        const response = await fetchDocumentById({ appId, documentId }).unwrap()
        const file = response.data

        const setFileStatus = (status: UploadFileStatus) =>
          setValue('uploadImage.leadPictureUri', {
            name: documentName,
            status,
          } as any)
        setFileStatus(UploadStatus.UPLOAD_SUCCESS)
        return setCardImage(URL.createObjectURL(file))
      } catch (error) {
        console.error(error, 'ERROR WHILE FETCHING IMAGE')
      }
    },
    [fetchDocumentById, appId, setValue]
  )

  useEffect(() => {
    if (
      serviceStatusData?.documents?.APP_LEADIMAGE &&
      serviceStatusData?.documents?.APP_LEADIMAGE[0].documentId
    ) {
      fetchCardImage(
        serviceStatusData?.documents?.APP_LEADIMAGE[0].documentId,
        serviceStatusData?.documents?.APP_LEADIMAGE[0].documentName
      )
    }
    if (serviceStatusData && serviceStatusData.serviceTypeIds) {
      let values = serviceStatusData?.serviceTypeIds.map((item: string) => {
        return {
          name: item,
        }
      })
      setDefaultServiceTypeVal(values)
    }
  }, [serviceStatusData, fetchCardImage])

  useEffect(() => {
    if (fetchServiceStatus) dispatch(setServiceStatus(fetchServiceStatus))
    reset(defaultValues)
  }, [dispatch, fetchServiceStatus, defaultValues, reset])

  const handleSave = async (
    apiBody: CreateServiceStep1Item,
    buttonLabel: string
  ) => {
    await saveService({
      id: appId,
      body: apiBody,
    })
      .unwrap()
      .then(() => {
        dispatch(setAppId(appId))
        buttonLabel === 'saveAndProceed' && dispatch(increment())
        buttonLabel === 'save' && setServiceCardSnackbar(true)
        dispatch(setServiceStatus(fetchServiceStatus))
      })
      .catch(() => {
        setServiceCardNotification(true)
      })
  }

  const uploadDocumentApi = async (
    appId: string,
    documentTypeId: string,
    file: any
  ) => {
    const data = {
      appId: appId,
      documentTypeId: documentTypeId,
      body: { file },
    }

    await updateDocumentUpload(data).unwrap()
  }

  const handleCreate = async (
    apiBody: CreateServiceStep1Item,
    buttonLabel: string
  ) => {
    const uploadImageValue = getValues().uploadImage
      .leadPictureUri as unknown as DropzoneFile
    await createService({
      id: '',
      body: apiBody,
    })
      .unwrap()
      .then((result) => {
        if (isString(result)) {
          const setFileStatus = (status: UploadFileStatus) =>
            setValue('uploadImage.leadPictureUri', {
              name: uploadImageValue.name,
              size: uploadImageValue.size,
              status,
            } as any)

          setFileStatus(UploadStatus.UPLOADING)

          uploadDocumentApi(result, 'APP_LEADIMAGE', uploadImageValue)
            .then(() => {
              setFileStatus(UploadStatus.UPLOAD_SUCCESS)
            })
            .catch(() => {
              setFileStatus(UploadStatus.UPLOAD_ERROR)
            })

          dispatch(setAppId(result))
          buttonLabel === 'saveAndProceed' && dispatch(increment())
          buttonLabel === 'save' && setServiceCardSnackbar(true)
          dispatch(setServiceStatus(fetchServiceStatus))
        }
      })
      .catch(() => {
        setServiceCardNotification(true)
      })
  }

  const onSubmit = async (data: FormDataType, buttonLabel: string) => {
    const validateFields = await trigger(['title', 'serviceTypeIds'])
    const apiBody = {
      serviceTypeIds: data.serviceTypeIds,
      title: data.title,
      leadPictureUri:
        data.uploadImage.leadPictureUri !== null &&
        Object.keys(data.uploadImage.leadPictureUri).length > 0 &&
        Object.values(data.uploadImage.leadPictureUri)[0],
      descriptions: [
        {
          languageCode: 'de',
          longDescription:
            serviceStatusData?.descriptions?.filter(
              (serviceStatus: any) => serviceStatus.languageCode === 'de'
            )[0]?.longDescription || '',
          shortDescription:
            serviceStatusData?.descriptions?.filter(
              (serviceStatus: any) => serviceStatus.languageCode === 'de'
            )[0]?.shortDescription || '',
        },
        {
          languageCode: 'en',
          longDescription:
            serviceStatusData?.descriptions?.filter(
              (serviceStatus: any) => serviceStatus.languageCode === 'en'
            )[0]?.longDescription || '',
          shortDescription:
            serviceStatusData?.descriptions?.filter(
              (serviceStatus: any) => serviceStatus.languageCode === 'en'
            )[0]?.shortDescription || '',
        },
      ],
      privacyPolicies: [],
      salesManager: null,
      price: '',
    }
    if (validateFields) {
      if (appId) {
        handleSave(apiBody, buttonLabel)
      } else {
        handleCreate(apiBody, buttonLabel)
      }
    }
  }

  return (
    <div className="app-market-card">
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
              label={t('step1.serviceName') + ' *'}
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
            />

            <div className="form-field">
              <ConnectorFormInputField
                {...{
                  control,
                  trigger,
                  errors,
                  name: 'serviceTypeIds',
                  label: t('step1.serviceType') + ' *',
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
                  items: commonServiceTypeIds,
                  keyTitle: 'name',
                  saveKeyTitle: 'name',
                  notItemsText: t('serviceReleaseForm.noItemsSelected'),
                  buttonAddMore: t('serviceReleaseForm.addMore'),
                  filterOptionsArgs: {
                    matchFrom: 'any',
                    stringify: (option: any) => option.name,
                  },
                  defaultValues: defaultServiceTypeVal,
                }}
              />
            </div>

            <div className="form-field">
              {['shortDescriptionEN', 'shortDescriptionDE'].map(
                (desc: string, i) => (
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
                          <IconButton sx={{ color: '#939393' }} size="small">
                            <HelpOutlineIcon />
                          </IconButton>
                        </>
                      }
                      value={
                        (desc === 'shortDescriptionEN'
                          ? getValues().shortDescriptionEN.length
                          : getValues().shortDescriptionDE.length) + `/120`
                      }
                      patternKey="shortDescriptionEN"
                      patternEN={Patterns.offerCard.shortDescriptionEN}
                      patternDE={Patterns.offerCard.shortDescriptionDE}
                      isRequired={false}
                      rules={{
                        required:
                          t(`step1.${desc}`) +
                          t('serviceReleaseForm.isMandatory'),
                        minLength: `${t('serviceReleaseForm.minimum')} 10 ${t(
                          'serviceReleaseForm.charactersRequired'
                        )}`,
                        pattern: `${t(
                          'serviceReleaseForm.validCharactersIncludes'
                        )} ${
                          desc === 'shortDescriptionEN'
                            ? `a-zA-Z0-9 !?@&#'"()_-=/*.,;:`
                            : `a-zA-ZÀ-ÿ0-9 !?@&#'"()_-=/*.,;:`
                        }`,
                        maxLength: `${t('serviceReleaseForm.maximum')} 120 ${t(
                          'serviceReleaseForm.charactersAllowed'
                        )}`,
                      }}
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
        setPageNotification={setServiceCardNotification}
        setPageSnackbar={setServiceCardSnackbar}
        onBackIconClick={() => navigate('/home')}
        onSave={handleSubmit((data) => onSubmit(data, 'save'))}
        onSaveAndProceed={handleSubmit((data) =>
          onSubmit(data, 'saveAndProceed')
        )}
        isValid={isValid}
      />
    </div>
  )
}
