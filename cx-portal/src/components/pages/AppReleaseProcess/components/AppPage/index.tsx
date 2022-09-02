/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { Grid, Divider, Box, InputLabel } from '@mui/material'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Dropzone } from 'components/shared/basic/Dropzone'
import Patterns from 'types/Patterns'
import { ConnectorFormInputField } from '../AppMarketCard'
import { useState } from 'react'
import '../ReleaseProcessSteps.scss'

type FormDataType = {
  longDescriptionEN: string
  longDescriptionDE: string
  images: string
  uploadDataPrerequisits: string
  uploadTechnicalGuide: string
  uploadDataContract: string
  uploadAppContract: string
  providerHomePage: string
  providerContactEmail: string
  providerPhoneContact: string
}

export default function AppPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [notification, setNotification] = useState(false)

  const defaultValues = {
    longDescriptionEN: '',
    longDescriptionDE: '',
    images: '',
    uploadDataPrerequisits: '',
    uploadTechnicalGuide: '',
    uploadDataContract: '',
    uploadAppContract: '',
    providerHomePage: '',
    providerContactEmail: '',
    providerPhoneContact: '',
  }

  const {
    handleSubmit,
    getValues,
    control,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const onSubmit = async (data: FormDataType) => {
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
      handleSave(data)
    }
  }

  const handleSave = async (data: FormDataType) => {
    console.log('data', data)
    setNotification(true)
  }

  return (
    <div className="app-page">
      <Typography variant="h3" mt={10} mb={4} align="center">
        {t('content.apprelease.appPage.headerTitle')}
      </Typography>
      <Typography variant="body2" className="header-description" align="center">
        {t('content.apprelease.appPage.headerDescription')}
      </Typography>

      <Grid container spacing={2} sx={{ mt: 0 }}>
        <Grid item md={8} sx={{ mt: 0, mr: 'auto', mb: 0, ml: 'auto' }}>
          <form>
            <div className="form-field">
              {['longDescriptionEN', 'longDescriptionDE'].map(
                (item: string) => (
                  <>
                    <ConnectorFormInputField
                      {...{
                        control,
                        trigger,
                        errors,
                        name: item,
                        label: (
                          <>
                            {t(`content.apprelease.appPage.${item}`) + '*'}
                            <IconButton sx={{ color: '#939393' }} size="small">
                              <HelpOutlineIcon />
                            </IconButton>
                          </>
                        ),
                        placeholder: t(`content.apprelease.appPage.${item}`),
                        type: 'input',
                        textarea: true,
                        rules: {
                          required: {
                            value: true,
                            message: `${t(
                              `content.apprelease.appPage.${item}`
                            )} ${t(
                              'content.apprelease.appReleaseForm.isMandatory'
                            )}`,
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
                            value: /^([A-Za-z.:@0-9&_ -]){10,200}$/,
                            message: `${t(
                              'content.apprelease.appReleaseForm.validCharactersIncludes'
                            )} A-Za-z0-9.: @&`,
                          },
                          maxLength: {
                            value: 200,
                            message: `${t(
                              'content.apprelease.appReleaseForm.maximum'
                            )} 200 ${t(
                              'content.apprelease.appReleaseForm.charactersAllowed'
                            )}`,
                          },
                        },
                      }}
                    />
                    <Typography
                      variant="body2"
                      className="form-field"
                      align="right"
                    >
                      {(item === 'longDescriptionEN'
                        ? getValues().longDescriptionEN.length
                        : getValues().longDescriptionDE.length) + `/200`}
                    </Typography>
                  </>
                )
              )}
            </div>

            <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
            <div className="form-field">
              <InputLabel sx={{ mb: 3, mt: 3 }}>
                {t('content.apprelease.appPage.images') + '*'}
              </InputLabel>
              <Controller
                name={'images'}
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Dropzone
                    onFileDrop={(files: File[]) => {
                      onChange(files[0].name)
                      trigger('images')
                    }}
                  />
                )}
              />
              {errors?.images?.type === 'required' && (
                <p className="file-error-msg">
                  {t('content.apprelease.appReleaseForm.fileUploadIsMandatory')}
                </p>
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
            ].map((item: string) => (
              <>
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <div className="form-field">
                  <InputLabel sx={{ mb: 3, mt: 3 }}>
                    {t(`content.apprelease.appPage.${item}`) + '*'}
                  </InputLabel>
                  <ConnectorFormInputField
                    {...{
                      control,
                      trigger,
                      errors,
                      name: item,
                      type: 'dropzone',
                      rules: {
                        required: {
                          value: true,
                        },
                      },
                    }}
                  />
                  {item === 'uploadDataPrerequisits' &&
                    errors?.uploadDataPrerequisits?.type === 'required' && (
                      <p className="file-error-msg">
                        {t(
                          'content.apprelease.appReleaseForm.fileUploadIsMandatory'
                        )}
                      </p>
                    )}
                  {item === 'uploadTechnicalGuide' &&
                    errors?.uploadTechnicalGuide?.type === 'required' && (
                      <p className="file-error-msg">
                        {t(
                          'content.apprelease.appReleaseForm.fileUploadIsMandatory'
                        )}
                      </p>
                    )}
                  {item === 'uploadDataContract' &&
                    errors?.uploadDataContract?.type === 'required' && (
                      <p className="file-error-msg">
                        {t(
                          'content.apprelease.appReleaseForm.fileUploadIsMandatory'
                        )}
                      </p>
                    )}
                  {item === 'uploadAppContract' &&
                    errors?.uploadAppContract?.type === 'required' && (
                      <p className="file-error-msg">
                        {t(
                          'content.apprelease.appReleaseForm.fileUploadIsMandatory'
                        )}
                      </p>
                    )}
                </div>
              </>
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
                  label: t('content.apprelease.appPage.providerHomePage') + '*',
                  placeholder: t('content.apprelease.appPage.providerHomePage'),
                  type: 'input',
                  rules: {
                    required: {
                      value: true,
                      message: `${t(
                        'content.apprelease.appPage.providerHomePage'
                      )} ${t('content.apprelease.appReleaseForm.isMandatory')}`,
                    },
                    pattern: {
                      value: /^([A-Za-z.:@&0-9 !])$/,
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
                    t('content.apprelease.appPage.providerContactEmail') + '*',
                  placeholder: t(
                    'content.apprelease.appPage.providerContactEmail'
                  ),
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
                        'content.apprelease.appPage.PleaseEnterValidEmail'
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
                    t('content.apprelease.appPage.providerPhoneContact') + '*',
                  placeholder: t(
                    'content.apprelease.appPage.providerPhoneContact'
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
                      value: /^\+4[^\\d] \(0\d+\) \d{9,}$/,
                      message: t(
                        'content.apprelease.appPage.PleaseEnterValidContact'
                      ),
                    },
                  },
                }}
              />
            </div>

            <Box mb={2}>
              <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
              <Button
                variant="outlined"
                sx={{ mr: 1 }}
                startIcon={<HelpOutlineIcon />}
              >
                {t('content.apprelease.footerButtons.help')}
              </Button>
              <IconButton
                color="secondary"
                onClick={() => navigate('/appmanagement')}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
              <Button
                variant="contained"
                disabled={!isValid}
                sx={{ float: 'right' }}
                onClick={handleSubmit(onSubmit)}
              >
                {t('content.apprelease.footerButtons.saveAndProceed')}
              </Button>
              <Button
                variant="outlined"
                name="send"
                sx={{ float: 'right', mr: 1 }}
                onClick={handleSubmit(onSubmit)}
              >
                {t('content.apprelease.footerButtons.save')}
              </Button>
            </Box>
            {notification && (
              <div className="errorMsg">
                <PageNotifications
                  title={t('content.apprelease.appPage.error.title')}
                  description={t('content.apprelease.appPage.error.message')}
                  open
                  severity="error"
                />
              </div>
            )}
          </form>
        </Grid>
      </Grid>
    </div>
  )
}
