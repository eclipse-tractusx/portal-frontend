/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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
  Button,
  Typography,
  IconButton,
  PageNotifications,
  UploadFileStatus,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { Divider, Box, InputLabel, Grid } from '@mui/material'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useForm } from 'react-hook-form'
import Patterns from 'types/Patterns'
import { ConnectorFormInputField } from '../AppMarketCard'
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
  useFetchAppStatusQuery,
  useUpdateappMutation,
  useUpdateDocumentUploadMutation,
} from 'features/appManagement/apiSlice'
import { setAppStatus } from 'features/appManagement/actions'

type FormDataType = {
  longDescriptionEN: string
  longDescriptionDE: string
  images: File | null
  uploadDataPrerequisits: File | null
  uploadTechnicalGuide: File | null
  uploadDataContract: File | null
  uploadAppContract: File | null | string
  providerHomePage: string
  providerContactEmail: string
  providerPhoneContact: string
}

export default function AppPage() {
  const { t } = useTranslation()
  const [appPageNotification, setAppPageNotification] = useState(false)
  const dispatch = useDispatch()
  const [updateapp] = useUpdateappMutation()
  const [updateDocumentUpload] = useUpdateDocumentUploadMutation()
  const appId = useSelector(appIdSelector)
  const longDescriptionMaxLength = 2000
  const fetchAppStatus = useFetchAppStatusQuery(appId ?? '').data
  const appStatusData: any = useSelector(appStatusDataSelector)

  useEffect(() => {
    dispatch(setAppStatus(fetchAppStatus))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const defaultValues = {
    longDescriptionEN:
      fetchAppStatus?.descriptions?.filter(
        (appStatus: any) => appStatus.languageCode === 'en'
      )[0].longDescription || '',
    longDescriptionDE:
      fetchAppStatus?.descriptions?.filter(
        (appStatus: any) => appStatus.languageCode === 'de'
      )[0].longDescription || '',
    images: null,
    uploadDataPrerequisits: null,
    uploadTechnicalGuide: null,
    uploadDataContract: null,
    uploadAppContract: null,
    providerHomePage: fetchAppStatus?.providerUri || '',
    providerContactEmail: fetchAppStatus?.contactEmail || '',
    providerPhoneContact: fetchAppStatus?.contactNumber || '',
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

  const uploadAppContractValue = getValues().uploadAppContract
  const uploadDataContractValue = getValues().uploadDataContract
  const uploadDataPrerequisitsValue = getValues().uploadDataPrerequisits
  const uploadTechnicalGuideValue = getValues().uploadTechnicalGuide
  const imagesValue = getValues().images

  const setFileStatus = (
    fieldName: Parameters<typeof setValue>[0],
    status: UploadFileStatus
  ) => {
    const value = getValues(fieldName)

    setValue(fieldName, {
      name: value.name,
      size: value.size,
      status,
    } as any)
  }

  useEffect(() => {
    const value = getValues().uploadAppContract

    if (value && !('status' in value)) {
      setFileStatus('uploadAppContract', 'uploading')

      uploadDocumentApi(appId, 'APP_CONTRACT', value)
        .then(() => setFileStatus('uploadAppContract', 'upload_success'))
        .catch(() => setFileStatus('uploadAppContract', 'upload_error'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadAppContractValue])

  useEffect(() => {
    const value = getValues().uploadDataContract

    if (value && !('status' in value)) {
      setFileStatus('uploadDataContract', 'uploading')

      uploadDocumentApi(appId, 'APP_DATA_DETAILS', value)
        .then(() => setFileStatus('uploadDataContract', 'upload_success'))
        .catch(() => setFileStatus('uploadDataContract', 'upload_error'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadDataContractValue])

  useEffect(() => {
    const value = getValues().uploadDataPrerequisits

    if (value && !('status' in value)) {
      setFileStatus('uploadDataPrerequisits', 'uploading')

      uploadDocumentApi(appId, 'ADDITIONAL_DETAILS', value)
        .then(() => setFileStatus('uploadDataPrerequisits', 'upload_success'))
        .catch(() => setFileStatus('uploadDataPrerequisits', 'upload_error'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadDataPrerequisitsValue])

  useEffect(() => {
    const value = getValues().uploadTechnicalGuide

    if (value && !('status' in value)) {
      setFileStatus('uploadTechnicalGuide', 'uploading')

      uploadDocumentApi(appId, 'APP_TECHNICAL_INFORMATION', value)
        .then(() => setFileStatus('uploadDataPrerequisits', 'upload_success'))
        .catch(() => setFileStatus('uploadTechnicalGuide', 'upload_error'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadTechnicalGuideValue])

  useEffect(() => {
    const value = getValues().images

    if (value && !('status' in value)) {
      setFileStatus('images', 'uploading')

      // TODO: the API endpoint should support multiple images? Or is just one image allowed?
      uploadDocumentApi(appId, 'APP_IMAGE', value)
        .then(() => setFileStatus('images', 'upload_success'))
        .catch(() => setFileStatus('images', 'upload_error'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesValue])

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

    return updateDocumentUpload(data).unwrap()
  }

  const onAppPageSubmit = async (data: FormDataType, buttonLabel: string) => {
    const validateFields = await trigger([
      'longDescriptionEN',
      'longDescriptionDE',
      'images',
      'uploadDataPrerequisits',
      'uploadTechnicalGuide',
      'uploadDataContract',
      'uploadAppContract',
      'providerHomePage',
      'providerContactEmail',
      'providerPhoneContact',
    ])
    if (validateFields) {
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
            appStatusData?.descriptions?.filter(
              (appStatus: any) => appStatus.languageCode === 'en'
            )[0]?.shortDescription || '',
        },
        {
          languageCode: 'de',
          longDescription: data.longDescriptionDE,
          shortDescription:
            appStatusData?.descriptions?.filter(
              (appStatus: any) => appStatus.languageCode === 'de'
            )[0]?.shortDescription || '',
        },
      ],
      images: [],
      providerUri: data.providerHomePage,
      contactEmail: data.providerContactEmail,
      contactNumber: data.providerPhoneContact,
    }

    try {
      await updateapp({ body: saveData, appId: appId }).unwrap()
      buttonLabel === 'saveAndProceed' && dispatch(increment())
    } catch (error: any) {
      setAppPageNotification(true)
    }
  }

  const onBackIconClick = () => {
    dispatch(setAppStatus(fetchAppStatus))
    dispatch(decrement())
  }

  return (
    <div className="app-page">
      <Typography variant="h3" mt={10} mb={4} align="center">
        {t('content.apprelease.appPage.headerTitle')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={11} sx={{ mr: 'auto', ml: 'auto', mb: 9 }}>
          <Typography variant="body2" align="center">
            {t('content.apprelease.appPage.headerDescription')}
          </Typography>
        </Grid>
      </Grid>
      <form className="header-description">
        <div className="form-field">
          {['longDescriptionEN', 'longDescriptionDE'].map((item: string, i) => (
            <div key={i}>
              <ConnectorFormInputField
                {...{
                  control,
                  trigger,
                  errors,
                  name: item,
                  label: (
                    <>
                      {t(`content.apprelease.appPage.${item}`) + ' *'}
                      <IconButton sx={{ color: '#939393' }} size="small">
                        <HelpOutlineIcon />
                      </IconButton>
                    </>
                  ),
                  type: 'input',
                  textarea: true,
                  rules: {
                    required: {
                      value: true,
                      message:
                        t(`content.apprelease.appPage.${item}`) +
                        t('content.apprelease.appReleaseForm.isMandatory'),
                    },
                    minLength: {
                      value: 10,
                      message: `${t(
                        'content.apprelease.appReleaseForm.minimum'
                      )} 10 ${t(
                        'content.apprelease.appReleaseForm.charactersRequired'
                      )}`,
                    },
                    pattern: {
                      value:
                        item === 'longDescriptionEN'
                          ? Patterns.appPage.longDescriptionEN
                          : Patterns.appPage.longDescriptionDE,
                      message: `${t(
                        'content.apprelease.appReleaseForm.validCharactersIncludes'
                      )} ${
                        item === 'longDescriptionEN'
                          ? `a-zA-Z0-9 !?@&#'"()[]_-+=<>/*.,;:`
                          : `a-zA-ZÀ-ÿ0-9 !?@&#'"()[]_-+=<>/*.,;:`
                      }`,
                    },
                    maxLength: {
                      value: longDescriptionMaxLength,
                      message: `${t(
                        'content.apprelease.appReleaseForm.maximum'
                      )} ${longDescriptionMaxLength} ${t(
                        'content.apprelease.appReleaseForm.charactersAllowed'
                      )}`,
                    },
                  },
                }}
              />
              <Typography variant="body2" className="form-field" align="right">
                {(item === 'longDescriptionEN'
                  ? getValues().longDescriptionEN.length
                  : getValues().longDescriptionDE.length) +
                  `/${longDescriptionMaxLength}`}
              </Typography>
            </div>
          ))}
        </div>

        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <div className="form-field">
          <InputLabel sx={{ mb: 3, mt: 3 }}>
            {t('content.apprelease.appPage.images') + ' *'}
          </InputLabel>
          <ConnectorFormInputField
            {...{
              control,
              trigger,
              errors,
              name: 'images',
              type: 'dropzone',
              acceptFormat: {
                'image/png': [],
                'image/jpeg': [],
              },
              maxFilesToUpload: 3, // TODO: the API endpoint should support multiple images? Or is just one image allowed?
              maxFileSize: 819200,
              rules: {
                required: {
                  value: true,
                },
              },
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
          'uploadDataContract',
          'uploadAppContract',
        ].map((item: string, i) => (
          <div key={i}>
            <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
            <div className="form-field" key={item}>
              <InputLabel sx={{ mb: 3, mt: 3 }}>
                {t(`content.apprelease.appPage.${item}`) + ' *'}
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
                  rules: {
                    required: {
                      value: true,
                    },
                  },
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
              {item === 'uploadDataContract' &&
                errors?.uploadDataContract?.type === 'required' && (
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
        <div className="form-field">
          <ConnectorFormInputField
            {...{
              control,
              trigger,
              errors,
              name: 'providerHomePage',
              label: t('content.apprelease.appPage.providerHomePage') + ' *',
              type: 'input',
              rules: {
                required: {
                  value: true,
                  message: `${t(
                    'content.apprelease.appPage.providerHomePage'
                  )} ${t('content.apprelease.appReleaseForm.isMandatory')}`,
                },
                pattern: {
                  value: Patterns.appPage.providerHomePage,
                  message: `${t(
                    'content.apprelease.appReleaseForm.validCharactersIncludes'
                  )} A-Za-z.:@&0-9 !`,
                },
              },
            }}
          />
        </div>

        <div className="form-field">
          <ConnectorFormInputField
            {...{
              control,
              trigger,
              errors,
              name: 'providerContactEmail',
              label:
                t('content.apprelease.appPage.providerContactEmail') + ' *',
              type: 'input',
              rules: {
                required: {
                  value: true,
                  message: `${t(
                    'content.apprelease.appPage.providerContactEmail'
                  )} ${t('content.apprelease.appReleaseForm.isMandatory')}`,
                },
                pattern: {
                  value: Patterns.MAIL,
                  message: t(
                    'content.apprelease.appPage.pleaseEnterValidEmail'
                  ),
                },
              },
            }}
          />
        </div>

        <div className="form-field">
          <ConnectorFormInputField
            {...{
              control,
              trigger,
              errors,
              name: 'providerPhoneContact',
              label:
                t('content.apprelease.appPage.providerPhoneContact') + ' *',
              placeholder: t(
                'content.apprelease.appPage.providerPhoneContactPlaceholder'
              ),
              type: 'input',
              rules: {
                required: {
                  value: true,
                  message: `${t(
                    'content.apprelease.appPage.providerPhoneContact'
                  )} ${t('content.apprelease.appReleaseForm.isMandatory')}`,
                },
                pattern: {
                  value: Patterns.appPage.phone,
                  message: t(
                    'content.apprelease.appPage.pleaseEnterValidContact'
                  ),
                },
              },
            }}
          />
        </div>
      </form>
      <Box mb={2}>
        {appPageNotification && (
          <Grid container xs={12} sx={{ mb: 2 }}>
            <Grid xs={6}></Grid>
            <Grid xs={6}>
              <PageNotifications
                title={t('content.apprelease.appReleaseForm.error.title')}
                description={t(
                  'content.apprelease.appReleaseForm.error.message'
                )}
                open
                severity="error"
                onCloseNotification={() => setAppPageNotification(false)}
              />
            </Grid>
          </Grid>
        )}
        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <Button
          sx={{ mr: 1 }}
          variant="outlined"
          startIcon={<HelpOutlineIcon />}
        >
          {t('content.apprelease.footerButtons.help')}
        </Button>
        <IconButton onClick={() => onBackIconClick()} color="secondary">
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Button
          sx={{ float: 'right' }}
          variant="contained"
          disabled={!isValid}
          onClick={handleSubmit((data) =>
            onAppPageSubmit(data, 'saveAndProceed')
          )}
        >
          {t('content.apprelease.footerButtons.saveAndProceed')}
        </Button>
        <Button
          variant="outlined"
          name="send"
          sx={{ float: 'right', mr: 1 }}
          onClick={handleSubmit((data) => onAppPageSubmit(data, 'save'))}
        >
          {t('content.apprelease.footerButtons.save')}
        </Button>
      </Box>
    </div>
  )
}
