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
  UploadFileStatus,
  UploadStatus,
  Radio,
  Alert,
  Checkbox,
  DropArea,
  DropAreaProps,
  PageSnackbar,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { Divider, InputLabel, Grid, Box } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Controller, useForm } from 'react-hook-form'
import Patterns from 'types/Patterns'
import { useEffect, useState } from 'react'
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
  useUpdateappMutation,
  useUpdateDocumentUploadMutation,
} from 'features/appManagement/apiSlice'
import { setAppStatus } from 'features/appManagement/actions'
import { Dropzone } from 'components/shared/basic/Dropzone'
import SnackbarNotificationWithButtons from '../components/SnackbarNotificationWithButtons'
import { ConnectorFormInputField } from '../components/ConnectorFormInputField'
import ReleaseStepHeader from '../components/ReleaseStepHeader'
import ProviderConnectorField from '../components/ProviderConnectorField'
import ConnectorFormInputFieldShortAndLongDescription from '../components/ConnectorFormInputFieldShortAndLongDescription'
import { ButtonLabelTypes } from '..'

type FormDataType = {
  longDescriptionEN: string
  longDescriptionDE: string
  images: any
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
  const [updateapp] = useUpdateappMutation()
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
  const appStatusData: any = useSelector(appStatusDataSelector)
  const statusData = fetchAppStatus || appStatusData
  const [loading, setLoading] = useState<boolean>(false)

  const [deleteAppReleaseDocument, deleteResponse] =
    useDeleteAppReleaseDocumentMutation()
  useEffect(() => {
    deleteResponse.isSuccess && setDeleteSuccess(true)
  }, [deleteResponse])

  const defaultValues = {
    longDescriptionEN:
      fetchAppStatus?.descriptions?.filter(
        (appStatus: any) => appStatus.languageCode === 'en'
      )[0]?.longDescription || '',
    longDescriptionDE:
      fetchAppStatus?.descriptions?.filter(
        (appStatus: any) => appStatus.languageCode === 'de'
      )[0]?.longDescription || '',
    images: fetchAppStatus?.documents?.APP_IMAGE || [],
    uploadDataPrerequisits:
      fetchAppStatus?.documents?.ADDITIONAL_DETAILS || null,
    uploadTechnicalGuide:
      fetchAppStatus?.documents?.APP_TECHNICAL_INFORMATION || null,
    uploadAppContract: fetchAppStatus?.documents?.APP_CONTRACT || null,
    providerHomePage: fetchAppStatus?.providerUri || '',
    providerContactEmail: fetchAppStatus?.contactEmail || '',
    providerPhoneContact: fetchAppStatus?.contactNumber || '',
    privacyPolicies: fetchAppStatus?.privacyPolicies || [],
  }

  const {
    handleSubmit,
    getValues,
    control,
    trigger,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: defaultValues,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    defaultImages,
    defaultuploadDataPrerequisits,
    defaultuploadTechnicalGuide,
    defaultuploadAppContract,
  ])

  const setFileStatus = (
    fieldName: Parameters<typeof setValue>[0],
    status: UploadFileStatus
  ) => {
    const value = getValues(fieldName)

    setValue(fieldName, {
      id: value.id,
      name: value.name,
      size: value.size,
      status,
    } as any)
  }

  useEffect(() => {
    const value = getValues().uploadAppContract

    if (value && !('status' in value)) {
      setFileStatus('uploadAppContract', UploadStatus.UPLOADING)

      uploadDocumentApi(appId, DocumentTypeId.APP_CONTRACT, value)
        .then(() =>
          setFileStatus('uploadAppContract', UploadStatus.UPLOAD_SUCCESS)
        )
        .catch(() =>
          setFileStatus('uploadAppContract', UploadStatus.UPLOAD_ERROR)
        )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadAppContractValue])

  useEffect(() => {
    const value = getValues().uploadDataPrerequisits

    if (value && !('status' in value)) {
      setFileStatus('uploadDataPrerequisits', UploadStatus.UPLOADING)

      uploadDocumentApi(appId, DocumentTypeId.ADDITIONAL_DETAILS, value)
        .then(() =>
          setFileStatus('uploadDataPrerequisits', UploadStatus.UPLOAD_SUCCESS)
        )
        .catch(() =>
          setFileStatus('uploadDataPrerequisits', UploadStatus.UPLOAD_ERROR)
        )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadDataPrerequisitsValue])

  useEffect(() => {
    const value = getValues().uploadTechnicalGuide

    if (value && !('status' in value)) {
      setFileStatus('uploadTechnicalGuide', UploadStatus.UPLOADING)

      uploadDocumentApi(appId, DocumentTypeId.APP_TECHNICAL_INFORMATION, value)
        .then(() =>
          setFileStatus('uploadTechnicalGuide', UploadStatus.UPLOAD_SUCCESS)
        )
        .catch(() =>
          setFileStatus('uploadTechnicalGuide', UploadStatus.UPLOAD_ERROR)
        )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadTechnicalGuideValue])

  const uploadImages = (files: any) => {
    const value = files
    if (value.length > 0) {
      const setFileStatus = (fileIndex: number, status: UploadFileStatus) => {
        const nextFiles = [...getValues().images] as any[]
        nextFiles[fileIndex] = {
          id: value[fileIndex].id,
          name: value[fileIndex].name,
          size: value[fileIndex].size,
          status,
        }
        setValue('images', nextFiles as any)
      }

      for (let fileIndex = 0; fileIndex < value.length; fileIndex++) {
        setFileStatus(fileIndex, UploadStatus.UPLOADING)
        uploadDocumentApi(appId, DocumentTypeId.APP_IMAGE, value[fileIndex])
          .then(() => setFileStatus(fileIndex, UploadStatus.UPLOAD_SUCCESS))
          .catch(() => setFileStatus(fileIndex, UploadStatus.UPLOAD_ERROR))
      }
    }
  }

  const uploadDocumentApi = async (
    appId: string,
    documentTypeId: DocumentTypeId,
    file: any
  ) => {
    const data = {
      appId: appId,
      documentTypeId: documentTypeId,
      body: { file },
    }

    return updateDocumentUpload(data).unwrap()
  }

  const onAppPageSubmit = async (data: FormDataType, buttonLabel: string) => {
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
    if (validateFields) {
      setLoading(true)
      handleSave(data, buttonLabel)
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
              (appStatus: any) => appStatus.languageCode === 'en'
            )[0]?.shortDescription || '',
        },
        {
          languageCode: 'de',
          longDescription: data.longDescriptionDE,
          shortDescription:
            statusData?.descriptions?.filter(
              (appStatus: any) => appStatus.languageCode === 'de'
            )[0]?.shortDescription || '',
        },
      ],
      images: [],
      providerUri: data.providerHomePage || '',
      contactEmail: data.providerContactEmail || '',
      contactNumber: data.providerPhoneContact || '',
      privacyPolicies: selectedPrivacyPolicies || [],
    }

    try {
      await updateapp({ body: saveData, appId: appId }).unwrap()
      buttonLabel === ButtonLabelTypes.SAVE_AND_PROCEED && dispatch(increment())
      buttonLabel === ButtonLabelTypes.SAVE && setAppPageSnackbar(true)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      setAppPageNotification(true)
    }
  }

  const onBackIconClick = () => {
    if (fetchAppStatus) dispatch(setAppStatus(fetchAppStatus))
    dispatch(decrement())
  }

  const selectPrivacyPolicies = (
    policy: string,
    select: boolean,
    type: string
  ) => {
    if (type === 'checkbox') {
      if (
        selectedPrivacyPolicies &&
        selectedPrivacyPolicies[0] === privacyPolicyNone
      ) {
        setSelectedPrivacyPolicies([...[], policy])
      } else {
        const isSelected = selectedPrivacyPolicies?.includes(policy)
        if (!isSelected && select) {
          setSelectedPrivacyPolicies([...selectedPrivacyPolicies, policy])
        } else if (isSelected && !select) {
          const oldPrivacyPolicies = [...selectedPrivacyPolicies]
          oldPrivacyPolicies.splice(oldPrivacyPolicies.indexOf(policy), 1)
          setSelectedPrivacyPolicies([...oldPrivacyPolicies])
        }
      }
    } else if (type === 'radio') {
      setSelectedPrivacyPolicies([...[], policy])
    }
  }

  const renderDropArea = (props: DropAreaProps) => {
    return <DropArea {...props} size="small" />
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
                    {t(`content.apprelease.appPage.${item}`) + ' *'}
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
                  pattern: `${t(
                    'content.apprelease.appReleaseForm.validCharactersIncludes'
                  )} ${
                    item === 'longDescriptionEN'
                      ? `a-zA-Z0-9 !?@&#'"()[]_-+=<>/*.,;:`
                      : `a-zA-ZÀ-ÿ0-9 !?@&#'"()[]_-+=<>/*.,;:`
                  }`,
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
            {t('content.apprelease.appPage.images') + ' *'}
          </InputLabel>
          <Controller
            name="images"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange: reactHookFormOnChange, value } }) => {
              return (
                <Dropzone
                  files={value}
                  onChange={(files, addedFiles, deletedFiles) => {
                    if (deletedFiles?.length) {
                      //to do: to call 'useDeleteDocumentMutation' on delete
                      console.log('deletedFile', deletedFiles)
                    }
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
                />
              )
            }}
          />
          {errors?.images?.type === 'required' && (
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
              />
              {item === 'uploadDataPrerequisits' &&
                errors?.uploadDataPrerequisits?.type === 'required' && (
                  <Typography variant="body2" className="file-error-msg">
                    {t(
                      'content.apprelease.appReleaseForm.fileUploadIsMandatory'
                    )}
                  </Typography>
                )}
              {item === 'uploadTechnicalGuide' &&
                errors?.uploadTechnicalGuide?.type === 'required' && (
                  <Typography variant="body2" className="file-error-msg">
                    {t(
                      'content.apprelease.appReleaseForm.fileUploadIsMandatory'
                    )}
                  </Typography>
                )}
              {item === 'uploadAppContract' &&
                errors?.uploadAppContract?.type === 'required' && (
                  <Typography variant="body2" className="file-error-msg">
                    {t(
                      'content.apprelease.appReleaseForm.fileUploadIsMandatory'
                    )}
                  </Typography>
                )}
            </div>
          </div>
        ))}

        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <InputLabel sx={{ mb: 3 }}>
          {t('content.apprelease.appPage.providerDetails')}
        </InputLabel>
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

        <ProviderConnectorField
          {...{
            control,
            trigger,
            errors,
          }}
          name="providerPhoneContact"
          label={t('content.apprelease.appPage.providerPhoneContact')}
          pattern={Patterns.appPage.phone}
          ruleMessage={t('content.apprelease.appPage.pleaseEnterValidContact')}
          placeholder={t(
            'content.apprelease.appPage.providerPhoneContactPlaceholder'
          )}
        />
        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <InputLabel sx={{ mb: 3 }}>
          {t('content.apprelease.appPage.privacyInformation')}
        </InputLabel>
        <Typography variant="body2">
          {t('content.apprelease.appPage.privacyInformationDescription')}
        </Typography>

        {privacyPolicies ? (
          <Grid container item spacing={2}>
            {privacyPolicies &&
              privacyPolicies?.map((item: string) => (
                <Grid item md={6} key={item}>
                  <Checkbox
                    label={item}
                    checked={selectedPrivacyPolicies.indexOf(item) !== -1}
                    onChange={(e) =>
                      selectPrivacyPolicies(item, e.target.checked, 'checkbox')
                    }
                  />
                </Grid>
              ))}
            <Grid item md={6}>
              <Radio
                label={
                  getPrivacyPolicies &&
                  getPrivacyPolicies?.privacyPolicies.slice(-1)[0]
                }
                checked={
                  selectedPrivacyPolicies &&
                  selectedPrivacyPolicies[0] === privacyPolicyNone
                }
                onChange={(e) =>
                  selectPrivacyPolicies(
                    privacyPolicyNone,
                    e.target.checked,
                    'radio'
                  )
                }
                name="radio-buttons"
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
        setPageNotification={() => setAppPageNotification(false)}
        setPageSnackbar={() => setAppPageSnackbar(false)}
        onBackIconClick={onBackIconClick}
        onSave={handleSubmit((data) =>
          onAppPageSubmit(data, ButtonLabelTypes.SAVE)
        )}
        onSaveAndProceed={handleSubmit((data) =>
          onAppPageSubmit(data, ButtonLabelTypes.SAVE_AND_PROCEED)
        )}
        isValid={isValid}
        loader={loading}
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
