/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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
  Typography,
  IconButton,
  type UploadFileStatus,
  UploadStatus,
  Radio,
  Alert,
  Checkbox,
  DropArea,
  type DropAreaProps,
  PageSnackbar,
} from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import { Divider, InputLabel, Grid, Box } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Controller, useForm } from 'react-hook-form'
import Patterns from 'types/Patterns'
import { useEffect, useState, useCallback, useMemo } from 'react'
import '../ReleaseProcessSteps.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  appIdSelector,
  appStatusDataSelector,
  decrement,
  increment,
} from 'features/appManagement/slice'
import {
  DocumentTypeId,
  useDeleteAppReleaseDocumentMutation,
  useFetchAppStatusQuery,
  useFetchPrivacyPoliciesQuery,
  useSaveAppMutation,
  useUpdateDocumentUploadMutation,
} from 'features/appManagement/apiSlice'
import { setAppStatus } from 'features/appManagement/actions'
import { Dropzone, type DropzoneFile } from 'components/shared/basic/Dropzone'
import SnackbarNotificationWithButtons from '../components/SnackbarNotificationWithButtons'
import { ConnectorFormInputField } from '../components/ConnectorFormInputField'
import ReleaseStepHeader from '../components/ReleaseStepHeader'
import ProviderConnectorField from '../components/ProviderConnectorField'
import ConnectorFormInputFieldShortAndLongDescription from '../components/ConnectorFormInputFieldShortAndLongDescription'
import {
  ErrorType,
  type LanguageStatusType,
  type UseCaseType,
} from 'features/appManagement/types'
import { ButtonLabelTypes } from '..'
import { PrivacyPolicyType } from 'features/adminBoard/adminBoardApiSlice'
import { phone } from 'phone'

type FormDataType = {
  longDescriptionEN: string
  longDescriptionDE: string
  images: []
  uploadDataPrerequisits: File | null
  uploadTechnicalGuide: File | null
  uploadAppContract: File | null | string
  providerHomePage: string
  providerContactEmail: string
  providerPhoneContact: string
  privacyPolicies: string[] | []
}

export default function AppPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const appId = useSelector(appIdSelector)

  const [appPageNotification, setAppPageNotification] = useState(false)
  const [appPageSnackbar, setAppPageSnackbar] = useState<boolean>(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [updateDocumentUpload] = useUpdateDocumentUploadMutation()

  const getPrivacyPolicies = useFetchPrivacyPoliciesQuery().data
  const privacyPolicies =
    getPrivacyPolicies && getPrivacyPolicies?.privacyPolicies.slice(0, -1)
  const [selectedPrivacyPolicies, setSelectedPrivacyPolicies] = useState<
    string[]
  >([])
  const privacyPolicyNone = 'NONE'
  const longDescriptionMaxLength = 2000
  const fetchAppStatus = useFetchAppStatusQuery(appId ?? '', {
    refetchOnMountOrArgChange: true,
  }).data
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  const appStatusData: any = useSelector(appStatusDataSelector)
  const statusData = fetchAppStatus ?? appStatusData
  const [loading, setLoading] = useState<boolean>(false)
  const [saveApp] = useSaveAppMutation()

  const [deleteAppReleaseDocument, deleteResponse] =
    useDeleteAppReleaseDocumentMutation()
  const [privacyError, setPrivacyError] = useState<boolean>(false)

  useEffect(() => {
    deleteResponse.isSuccess && setDeleteSuccess(true)
  }, [deleteResponse])

  const defaultValues = useMemo(() => {
    return {
      longDescriptionEN:
        fetchAppStatus?.descriptions?.filter(
          (appStatus: LanguageStatusType) => appStatus.languageCode === 'en'
        )[0]?.longDescription ?? '',
      longDescriptionDE:
        fetchAppStatus?.descriptions?.filter(
          (appStatus: LanguageStatusType) => appStatus.languageCode === 'de'
        )[0]?.longDescription ?? '',
      images: fetchAppStatus?.documents?.APP_IMAGE || [],
      uploadDataPrerequisits:
        fetchAppStatus?.documents?.ADDITIONAL_DETAILS ?? null,
      uploadTechnicalGuide:
        fetchAppStatus?.documents?.APP_TECHNICAL_INFORMATION ?? null,
      uploadAppContract: fetchAppStatus?.documents?.APP_CONTRACT ?? null,
      providerHomePage: fetchAppStatus?.providerUri ?? '',
      providerContactEmail: fetchAppStatus?.contactEmail ?? '',
      providerPhoneContact: fetchAppStatus?.contactNumber ?? '',
      privacyPolicies: fetchAppStatus?.privacyPolicies ?? [],
    }
  }, [fetchAppStatus])

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

  useEffect(() => {
    if (fetchAppStatus) {
      dispatch(setAppStatus(fetchAppStatus))
      fetchAppStatus?.privacyPolicies &&
        setSelectedPrivacyPolicies(fetchAppStatus?.privacyPolicies)
    }
  }, [dispatch, fetchAppStatus])

  const uploadAppContractValue = getValues().uploadAppContract
  const uploadDataPrerequisitsValue = getValues().uploadDataPrerequisits
  const uploadTechnicalGuideValue = getValues().uploadTechnicalGuide
  const defaultImages = defaultValues.images
  const defaultuploadDataPrerequisits = defaultValues.uploadDataPrerequisits
  const defaultuploadTechnicalGuide = defaultValues.uploadTechnicalGuide
  const defaultuploadAppContract = defaultValues.uploadAppContract

  const setFileStatus = useCallback(
    (fieldName: Parameters<typeof setValue>[0], status: UploadFileStatus) => {
      const value = getValues(fieldName)
      if (value)
        setValue(fieldName, {
          id: value.id,
          name: value.name,
          size: value.size,
          status,
        } as unknown)
    },
    [getValues, setValue]
  )

  useEffect(() => {
    const images = defaultImages?.map(
      (item: { documentId: string; documentName: string }) => ({
        id: item.documentId,
        name: item.documentName,
        status: UploadStatus.UPLOAD_SUCCESS,
      })
    )

    if (images.length > 0) {
      const setFileStatus = (fileIndex: number, status: UploadFileStatus) => {
        const nextFiles = images
        nextFiles[fileIndex] = {
          id: images[fileIndex].id,
          name: images[fileIndex].name,
          status,
        }
        setValue('images', nextFiles)
      }

      for (let fileIndex = 0; fileIndex < images.length; fileIndex++) {
        setFileStatus(fileIndex, UploadStatus.UPLOAD_SUCCESS)
      }
    }

    if (
      defaultuploadDataPrerequisits &&
      Object.keys(defaultuploadDataPrerequisits).length > 0
    ) {
      setValue('uploadDataPrerequisits', {
        id:
          defaultuploadDataPrerequisits &&
          defaultuploadDataPrerequisits[0]?.documentId,
        name:
          defaultuploadDataPrerequisits &&
          defaultuploadDataPrerequisits[0]?.documentName,
        status: UploadStatus.UPLOAD_SUCCESS,
      })
      setFileStatus('uploadDataPrerequisits', UploadStatus.UPLOAD_SUCCESS)
    }

    if (
      defaultuploadTechnicalGuide &&
      Object.keys(defaultuploadTechnicalGuide).length > 0
    ) {
      setValue('uploadTechnicalGuide', {
        id:
          defaultuploadTechnicalGuide &&
          defaultuploadTechnicalGuide[0]?.documentId,
        name:
          defaultuploadTechnicalGuide &&
          defaultuploadTechnicalGuide[0]?.documentName,
        status: UploadStatus.UPLOAD_SUCCESS,
      })
      setFileStatus('uploadTechnicalGuide', UploadStatus.UPLOAD_SUCCESS)
    }

    if (
      defaultuploadAppContract &&
      Object.keys(defaultuploadAppContract).length > 0
    ) {
      setValue('uploadAppContract', {
        id: defaultuploadAppContract && defaultuploadAppContract[0]?.documentId,
        name:
          defaultuploadAppContract && defaultuploadAppContract[0]?.documentName,
        status: UploadStatus.UPLOAD_SUCCESS,
      })
      setFileStatus('uploadAppContract', UploadStatus.UPLOAD_SUCCESS)
    }
  }, [
    defaultImages,
    defaultuploadDataPrerequisits,
    defaultuploadTechnicalGuide,
    defaultuploadAppContract,
    setFileStatus,
    setValue,
  ])

  const uploadDocumentApi = useCallback(
    async (documentTypeId: DocumentTypeId, file: File) => {
      const data = {
        appId,
        documentTypeId,
        body: { file },
      }

      if (updateDocumentUpload) await updateDocumentUpload(data).unwrap()
    },
    [updateDocumentUpload, appId]
  )

  useEffect(() => {
    const value = getValues().uploadAppContract

    if (value && !('status' in value)) {
      setFileStatus('uploadAppContract', UploadStatus.UPLOADING)

      uploadDocumentApi(DocumentTypeId.APP_CONTRACT, value)
        .then(() => {
          setFileStatus('uploadAppContract', UploadStatus.UPLOAD_SUCCESS)
        })
        .catch(() => {
          setFileStatus('uploadAppContract', UploadStatus.UPLOAD_ERROR)
        })
    }
  }, [uploadAppContractValue, getValues, setFileStatus, uploadDocumentApi])

  useEffect(() => {
    const value = getValues().uploadDataPrerequisits

    if (value && !('status' in value)) {
      setFileStatus('uploadDataPrerequisits', UploadStatus.UPLOADING)

      uploadDocumentApi(DocumentTypeId.ADDITIONAL_DETAILS, value)
        .then(() => {
          setFileStatus('uploadDataPrerequisits', UploadStatus.UPLOAD_SUCCESS)
        })
        .catch(() => {
          setFileStatus('uploadDataPrerequisits', UploadStatus.UPLOAD_ERROR)
        })
    }
  }, [uploadDataPrerequisitsValue, getValues, setFileStatus, uploadDocumentApi])

  useEffect(() => {
    const value = getValues().uploadTechnicalGuide

    if (value && !('status' in value)) {
      setFileStatus('uploadTechnicalGuide', UploadStatus.UPLOADING)

      uploadDocumentApi(DocumentTypeId.APP_TECHNICAL_INFORMATION, value)
        .then(() => {
          setFileStatus('uploadTechnicalGuide', UploadStatus.UPLOAD_SUCCESS)
        })
        .catch(() => {
          setFileStatus('uploadTechnicalGuide', UploadStatus.UPLOAD_ERROR)
        })
    }
  }, [uploadTechnicalGuideValue, getValues, setFileStatus, uploadDocumentApi])

  const uploadImages = (files: DropzoneFile[]) => {
    const value = files
    if (value.length > 0) {
      const setFileStatus = (fileIndex: number, status: UploadFileStatus) => {
        // Add an ESLint exception until there is a solution
        // eslint-disable-next-line
        const nextFiles = [...getValues().images] as any[]
        nextFiles[fileIndex] = {
          id: value[fileIndex].id,
          name: value[fileIndex].name,
          size: value[fileIndex].size,
          status,
        }
        setValue('images', nextFiles as File[])
      }

      for (let fileIndex = 0; fileIndex < value.length; fileIndex++) {
        setFileStatus(fileIndex, UploadStatus.UPLOADING)
        uploadDocumentApi(DocumentTypeId.APP_IMAGE, value[fileIndex])
          .then(() => {
            setFileStatus(fileIndex, UploadStatus.UPLOAD_SUCCESS)
          })
          .catch(() => {
            setFileStatus(fileIndex, UploadStatus.UPLOAD_ERROR)
          })
      }
    }
  }

  const onAppPageSubmit = async (data: FormDataType, buttonLabel: string) => {
    if (selectedPrivacyPolicies.length === 0) setPrivacyError(true)
    const validateFields = await trigger([
      'longDescriptionEN',
      'longDescriptionDE',
      'images',
      'uploadDataPrerequisits',
      'uploadTechnicalGuide',
      'uploadAppContract',
      'providerHomePage',
      'providerContactEmail',
      'providerPhoneContact',
    ])
    if (validateFields && selectedPrivacyPolicies.length > 0) {
      setLoading(true)
      setPrivacyError(false)
      void handleSave(data, buttonLabel)
    }
  }

  const handleSave = async (data: FormDataType, buttonLabel: string) => {
    const saveData = {
      descriptions: [
        {
          languageCode: 'en',
          longDescription: data.longDescriptionEN,
          shortDescription:
            statusData?.descriptions?.filter(
              (appStatus: LanguageStatusType) => appStatus.languageCode === 'en'
            )[0]?.shortDescription ?? '',
        },
        {
          languageCode: 'de',
          longDescription: data.longDescriptionDE,
          shortDescription:
            statusData?.descriptions?.filter(
              (appStatus: LanguageStatusType) => appStatus.languageCode === 'de'
            )[0]?.shortDescription ?? '',
        },
      ],
      title: statusData.title,
      provider: statusData.provider,
      salesManagerId: statusData.salesManagerId,
      useCaseIds: statusData.useCase?.map((item: UseCaseType) => item.id),
      supportedLanguageCodes: statusData.supportedLanguageCodes,
      price: statusData.price,
      privacyPolicies: selectedPrivacyPolicies,
      providerUri: data.providerHomePage ?? '',
      contactEmail: data.providerContactEmail ?? '',
      contactNumber: data.providerPhoneContact ?? '',
    }

    try {
      await saveApp({ appId, body: saveData }).unwrap()
      buttonLabel === ButtonLabelTypes.SAVE_AND_PROCEED && dispatch(increment())
      buttonLabel === ButtonLabelTypes.SAVE && setAppPageSnackbar(true)
    } catch (error: unknown) {
      setAppPageNotification(true)
    }
    setLoading(false)
  }

  const onBackIconClick = () => {
    if (fetchAppStatus) dispatch(setAppStatus(fetchAppStatus))
    dispatch(decrement())
  }

  const selectCheckboxPrivacyPolicies = (policy: string, select: boolean) => {
    if (
      selectedPrivacyPolicies &&
      selectedPrivacyPolicies[0] === privacyPolicyNone
    ) {
      setSelectedPrivacyPolicies([...[], policy])
    } else {
      const isSelected = selectedPrivacyPolicies?.includes(policy)
      if (isSelected && selectedPrivacyPolicies.length === 1)
        setPrivacyError(true)
      if (!isSelected && select) {
        setSelectedPrivacyPolicies([...selectedPrivacyPolicies, policy])
      } else if (isSelected && !select) {
        const oldPrivacyPolicies = [...selectedPrivacyPolicies]
        oldPrivacyPolicies.splice(oldPrivacyPolicies.indexOf(policy), 1)
        setSelectedPrivacyPolicies([...oldPrivacyPolicies])
      }
    }
  }

  const selectPrivacyPolicies = (
    policy: string,
    select: boolean,
    type: string
  ) => {
    if (type === 'checkbox') {
      selectCheckboxPrivacyPolicies(policy, select)
    } else if (type === 'radio') {
      setSelectedPrivacyPolicies([...[], policy])
    }
    if (selectedPrivacyPolicies.length === 0) setPrivacyError(false)
  }

  const renderDropArea = (props: DropAreaProps) => {
    return <DropArea {...props} size="small" />
  }

  const getLabel = (item: string) =>
    Object.keys(PrivacyPolicyType).includes(item)
      ? t(`content.appdetail.privacy.${item}`)
      : item

  const patternValidation = (item: string) => {
    if (
      (item === 'longDescriptionEN' &&
        /[ @=<>*\-+#?%&_:;]/.test(getValues().longDescriptionEN.charAt(0))) ??
      item === 'longDescriptionEN'
    ) {
      return `${t(
        'content.apprelease.appReleaseForm.validCharactersIncludes'
      )} a-zA-Z0-9 !?@&#'"()[]_-+=<>/*.,;:% and should not start with @=<>*-+ #?%&_:;`
    } else {
      return `${t(
        'content.apprelease.appReleaseForm.validCharactersIncludes'
      )} a-zA-ZÀ-ÿ0-9 !?@&#'"()[]_-+=<>/*.,;:% and should not start with @=<>*-+ #?%&_:;`
    }
  }

  return (
    <div className="app-page">
      <ReleaseStepHeader
        title={t('content.apprelease.appPage.headerTitle')}
        description={t('content.apprelease.appPage.headerDescription')}
      />
      <form className="header-description">
        <div className="form-field">
          {['longDescriptionEN', 'longDescriptionDE'].map((item: string) => (
            <div key={item}>
              <ConnectorFormInputFieldShortAndLongDescription
                {...{
                  control,
                  trigger,
                  errors,
                  item,
                }}
                label={
                  <>
                    {t(`content.apprelease.appPage.${item}`)}
                    <span style={{ color: 'red' }}> *</span>
                    <IconButton sx={{ color: '#939393' }} size="small">
                      <HelpOutlineIcon />
                    </IconButton>
                  </>
                }
                value={
                  (item === 'longDescriptionEN'
                    ? getValues().longDescriptionEN.length
                    : getValues().longDescriptionDE.length) +
                  `/${longDescriptionMaxLength}`
                }
                patternKey="longDescriptionEN"
                patternEN={Patterns.appPage.longDescriptionEN}
                patternDE={Patterns.appPage.longDescriptionDE}
                rules={{
                  required:
                    t(`content.apprelease.appPage.${item}`) +
                    t('content.apprelease.appReleaseForm.isMandatory'),
                  minLength: `${t(
                    'content.apprelease.appReleaseForm.minimum'
                  )} 10 ${t(
                    'content.apprelease.appReleaseForm.charactersRequired'
                  )}`,
                  pattern: patternValidation(item),
                  maxLength: `${t(
                    'content.apprelease.appReleaseForm.maximum'
                  )} ${longDescriptionMaxLength} ${t(
                    'content.apprelease.appReleaseForm.charactersAllowed'
                  )}`,
                }}
                maxLength={longDescriptionMaxLength}
              />
            </div>
          ))}
        </div>

        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <div className="form-field">
          <InputLabel sx={{ mb: 3, mt: 3 }}>
            {t('content.apprelease.appPage.images')}
            <span style={{ color: 'red' }}> *</span>
          </InputLabel>
          <Controller
            name="images"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange: reactHookFormOnChange, value } }) => {
              return (
                <Dropzone
                  files={value}
                  onChange={(files, addedFiles) => {
                    reactHookFormOnChange(files)
                    trigger('images')
                    addedFiles && uploadImages(files)
                  }}
                  acceptFormat={{
                    'image/png': [],
                    'image/jpeg': [],
                  }}
                  maxFilesToUpload={3}
                  maxFileSize={819200}
                  DropArea={renderDropArea}
                  handleDelete={(documentId: string) => {
                    setDeleteSuccess(false)
                    documentId && deleteAppReleaseDocument(documentId)
                  }}
                  errorText={t(
                    'content.apprelease.appReleaseForm.fileSizeError'
                  )}
                />
              )
            }}
          />
          {errors?.images?.type === ErrorType.REQUIRED && (
            <Typography variant="body2" className="file-error-msg">
              {t('content.apprelease.appReleaseForm.fileUploadIsMandatory')}
            </Typography>
          )}
          <Typography variant="body2" mt={3} sx={{ fontWeight: 'bold' }}>
            {t('content.apprelease.appReleaseForm.note')}
          </Typography>
          <Typography variant="body2" mb={3}>
            {t('content.apprelease.appReleaseForm.max3Images')}
          </Typography>
        </div>

        {[
          'uploadDataPrerequisits',
          'uploadTechnicalGuide',
          'uploadAppContract',
        ].map((item: string, i) => (
          <div key={item}>
            <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
            <div className="form-field" key={item}>
              <InputLabel sx={{ mb: 3, mt: 3 }}>
                {t(`content.apprelease.appPage.${item}`)}
              </InputLabel>
              <ConnectorFormInputField
                {...{
                  control,
                  trigger,
                  errors,
                  name: item,
                  type: 'dropzone',
                  acceptFormat: {
                    'application/pdf': ['.pdf'],
                  },
                  maxFilesToUpload: 1,
                  maxFileSize: 819200,
                  size: 'small',
                }}
                handleDelete={(documentId: string) => {
                  setDeleteSuccess(false)
                  documentId && deleteAppReleaseDocument(documentId)
                }}
                errorText={t('content.apprelease.appReleaseForm.fileSizeError')}
              />
            </div>
          </div>
        ))}

        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <InputLabel sx={{ mb: 3 }}>
          {t('content.apprelease.appPage.providerDetails')}
        </InputLabel>
        <div className="form-field">
          <ProviderConnectorField
            {...{
              control,
              trigger,
              errors,
            }}
            name="providerHomePage"
            label={t('content.apprelease.appPage.providerHomePage')}
            pattern={Patterns.URL}
            ruleMessage={t(
              'content.apprelease.appPage.pleaseEnterValidHomePageURL'
            )}
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
            label={t('content.apprelease.appPage.providerContactEmail')}
            pattern={Patterns.MAIL}
            ruleMessage={t('content.apprelease.appPage.pleaseEnterValidEmail')}
          />
        </div>
        <div className="form-field">
          <ProviderConnectorField
            {...{
              control,
              trigger,
              errors,
            }}
            name="providerPhoneContact"
            label={t('content.apprelease.appPage.providerPhoneContact')}
            validate={(value: string) => value === '' || phone(value).isValid}
          />
          {errors.providerPhoneContact &&
            errors?.providerPhoneContact.type === 'validate' && (
              <Typography variant="body2" className="file-error-msg">
                {t('content.apprelease.appPage.pleaseEnterValidContact')}
              </Typography>
            )}
        </div>
        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <InputLabel sx={{ mb: 3 }}>
          {t('content.apprelease.appPage.privacyInformation')}
          <span style={{ color: 'red' }}> *</span>
        </InputLabel>
        <Typography variant="body2" sx={{ marginBottom: '10px' }}>
          {t('content.apprelease.appPage.privacyInformationDescription')}
        </Typography>

        {privacyPolicies ? (
          <Grid container item spacing={2}>
            {privacyPolicies &&
              privacyPolicies?.map((item: string) => (
                <Grid item md={6} key={item} className="privacyPolicies">
                  <Checkbox
                    label={getLabel(item)}
                    checked={selectedPrivacyPolicies.indexOf(item) !== -1}
                    onChange={(e) => {
                      selectPrivacyPolicies(item, e.target.checked, 'checkbox')
                    }}
                    size="small"
                  />
                </Grid>
              ))}
            <Grid item md={6} className="privacyPolicies">
              <Radio
                label={getLabel(
                  getPrivacyPolicies &&
                    getPrivacyPolicies?.privacyPolicies.slice(-1)[0]
                )}
                checked={
                  selectedPrivacyPolicies &&
                  selectedPrivacyPolicies[0] === privacyPolicyNone
                }
                onChange={(e) => {
                  selectPrivacyPolicies(
                    privacyPolicyNone,
                    e.target.checked,
                    'radio'
                  )
                }}
                name="radio-buttons"
                size="small"
              />
            </Grid>
          </Grid>
        ) : (
          <Box sx={{ marginY: 2 }}>
            <Alert width={'100%'} severity="error">
              <span>{t('content.apprelease.appPage.privacyInfoError')}</span>
            </Alert>
          </Box>
        )}
        {privacyError && (
          <Typography variant="body2" className="file-error-msg">
            {t('content.apprelease.appPage.privacyInformationMandatory')}
          </Typography>
        )}
      </form>
      <SnackbarNotificationWithButtons
        pageNotification={appPageNotification}
        pageSnackbar={appPageSnackbar}
        pageSnackBarDescription={t(
          'content.apprelease.appReleaseForm.dataSavedSuccessMessage'
        )}
        pageNotificationsObject={{
          title: t('content.apprelease.appReleaseForm.error.title'),
          description: t('content.apprelease.appReleaseForm.error.message'),
        }}
        setPageNotification={() => {
          setAppPageNotification(false)
        }}
        setPageSnackbar={() => {
          setAppPageSnackbar(false)
        }}
        onBackIconClick={onBackIconClick}
        onSave={handleSubmit((data) =>
          onAppPageSubmit(data, ButtonLabelTypes.SAVE)
        )}
        onSaveAndProceed={handleSubmit((data) =>
          onAppPageSubmit(data, ButtonLabelTypes.SAVE_AND_PROCEED)
        )}
        isValid={isValid && selectedPrivacyPolicies.length > 0}
        loader={loading}
        helpUrl={
          '/documentation/?path=docs%2F04.+App%28s%29%2F02.+App+Release+Process'
        }
      />
      <PageSnackbar
        autoClose
        description={t(
          'content.apprelease.contractAndConsent.documentDeleteSuccess'
        )}
        open={deleteSuccess}
        severity={'success'}
        showIcon
      />
    </div>
  )
}
