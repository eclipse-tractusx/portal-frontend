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
  Chip,
  IconButton,
  PageNotifications,
  Typography,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Divider, Box, Grid } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { decrement, increment } from 'features/appManagement/slice'
import Patterns from 'types/Patterns'
import { ConnectorFormInputField } from '../AppMarketCard'
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined'
import DoneIcon from '@mui/icons-material/Done'
import { Dropzone } from 'components/shared/basic/Dropzone'
import { isString } from 'lodash'

export default function TechnicalIntegration() {
  const { t } = useTranslation()
  const [
    technicalIntegrationNotification,
    setTechnicalIntegrationNotification,
  ] = useState(false)
  const dispatch = useDispatch()
  const [disableCreateClient, setDisableCreateClient] = useState(true)
  const [createClientSuccess, setCreateClientSuccess] = useState(false)
  const [enableUploadAppRoles, setEnableUploadAppRoles] = useState(false)
  const [enableTestUserButton, setEnableTestUserButton] = useState(false)
  const [showUserButton, setShowUserButton] = useState(true)
  const [rolesPreviews, setRolesPreviews] = useState<string[]>([])

  const defaultValues = {
    clientId: '',
    URL: '',
    uploadAppRoles: '',
  }

  const {
    handleSubmit,
    getValues,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const clientIdValue = getValues().clientId
  const URLValue = getValues().URL

  const onIntegrationSubmit = async (data: any) =>
    setTechnicalIntegrationNotification(true)

  useEffect(() => {
    if (
      getValues().clientId !== '' &&
      getValues().URL !== '' &&
      !errors?.clientId &&
      !errors?.URL
    )
      setDisableCreateClient(false)
    else setDisableCreateClient(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientIdValue, URLValue])

  const csvPreview = (files: File[]) => {
    return files
      .filter((file: File) => file.type === 'text/csv')
      .forEach((file: File) => {
        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          const str = reader.result
          if (!isString(str)) return
          const roles = str
            ?.split('\n')
            .filter((item) => item !== '')
            .map((item) => item.substring(0, item.indexOf(';')))
          setRolesPreviews(roles)
        }
        reader.readAsText(file)
      })
  }

  return (
    <div className="technical-integration">
      <Typography variant="h3" mt={10} mb={4} align="center">
        {t('content.apprelease.technicalIntegration.headerTitle')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={11} sx={{ mr: 'auto', ml: 'auto', mb: 9 }}>
          <Typography variant="body2" align="center">
            {t('content.apprelease.technicalIntegration.headerDescription')}
          </Typography>
        </Grid>
      </Grid>

      <form className="header-description">
        <Typography variant="h5" mb={4}>
          {t('content.apprelease.technicalIntegration.step1Header')}
        </Typography>
        <Typography variant="body2" mb={4}>
          {t('content.apprelease.technicalIntegration.step1HeaderDescription')}
        </Typography>
        <div className="form-field">
          <ConnectorFormInputField
            {...{
              control,
              trigger,
              errors,
              name: 'clientId',
              label:
                t('content.apprelease.technicalIntegration.clientID') + ' *',
              placeholder: t(
                'content.apprelease.technicalIntegration.clientID'
              ),
              type: 'input',
              rules: {
                required: {
                  value: true,
                  message: `${t(
                    'content.apprelease.technicalIntegration.clientID'
                  )} ${t('content.apprelease.appReleaseForm.isMandatory')}`,
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
              name: 'URL',
              label: t('content.apprelease.technicalIntegration.URL') + ' *',
              placeholder: t(
                'content.apprelease.technicalIntegration.URLPlaceholder'
              ),
              type: 'input',
              rules: {
                required: {
                  value: true,
                  message: `${t(
                    'content.apprelease.technicalIntegration.URL'
                  )} ${t('content.apprelease.appReleaseForm.isMandatory')}`,
                },
                pattern: {
                  value: Patterns.URL,
                  message: t(
                    'content.apprelease.technicalIntegration.pleaseEnterValidURL'
                  ),
                },
              },
            }}
          />
        </div>
        <Box textAlign="center">
          <Button
            variant="contained"
            startIcon={createClientSuccess && <DoneIcon />}
            sx={{ mr: 2 }}
            disabled={disableCreateClient}
            color={createClientSuccess ? 'success' : 'secondary'}
            onClick={() => setCreateClientSuccess(true)}
          >
            {createClientSuccess
              ? t('content.apprelease.technicalIntegration.createClient')
              : t('content.apprelease.technicalIntegration.clientCreated')}
          </Button>
          {createClientSuccess && (
            <IconButton color="secondary">
              <DeleteIcon />
            </IconButton>
          )}
        </Box>

        <Divider className="form-divider" />
        <Typography variant="h5" mb={4}>
          {t('content.apprelease.technicalIntegration.step2Header')}
        </Typography>
        {enableUploadAppRoles && (
          <>
            <Controller
              name={'uploadAppRoles'}
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <Dropzone
                  onFileDrop={(files: File[]) => {
                    onChange(files[0].name)
                    trigger('uploadAppRoles')
                    csvPreview(files)
                  }}
                  acceptFormat={{ 'text/csv': ['.csv'] }}
                  maxFilesToUpload={1}
                />
              )}
            />
            {errors?.uploadAppRoles?.type === 'required' && (
              <Typography variant="body2" className="file-error-msg">
                {t('content.apprelease.appReleaseForm.fileUploadIsMandatory')}
              </Typography>
            )}
            {rolesPreviews?.length > 0 && (
              <>
                <Typography variant="h6" mb={2} textAlign="center">
                  {t('content.apprelease.technicalIntegration.rolesPreview')}
                </Typography>
                <Grid container xs={12}>
                  {rolesPreviews?.map((role: string, index: number) => (
                    <Grid xs={6}>
                      <Chip
                        key={index}
                        label={role}
                        withIcon={false}
                        type="plain"
                        variant="filled"
                        color="secondary"
                        sx={{ mb: 1, ml: 1, mr: 1, mt: 1 }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </>
        )}

        <Box textAlign="center">
          <Button
            variant="contained"
            sx={{ mr: 2, mt: 3 }}
            disabled={!createClientSuccess}
            onClick={() => {
              getValues().uploadAppRoles === ''
                ? setEnableUploadAppRoles(true)
                : setEnableTestUserButton(true)
            }}
          >
            {getValues().uploadAppRoles === ''
              ? t(
                  'content.apprelease.technicalIntegration.clickToOpenDialogBox'
                )
              : t(
                  'content.apprelease.technicalIntegration.createThoseForYourApp'
                )}
          </Button>
        </Box>

        <Divider className="form-divider" />
        <Typography variant="h5" mb={4}>
          {t('content.apprelease.technicalIntegration.step3Header')}
        </Typography>
        <Typography variant="body2" mb={4}>
          {t('content.apprelease.technicalIntegration.step3HeaderDescription')}
        </Typography>

        <Divider className="form-divider" />
        <Typography variant="h5" mb={4}>
          {t('content.apprelease.technicalIntegration.step4Header')}
        </Typography>
        <Typography variant="body2" mb={4}>
          {t('content.apprelease.technicalIntegration.step4HeaderDescription')}
        </Typography>
        {showUserButton ? (
          <Box textAlign="center">
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              disabled={!enableTestUserButton}
              onClick={() => setShowUserButton(false)}
            >
              {t('content.apprelease.technicalIntegration.createTestUser')}
            </Button>
          </Box>
        ) : (
          <Grid container xs={12}>
            <Grid xs={2}>
              {t('content.apprelease.technicalIntegration.password')}
            </Grid>
            <Grid xs={4}>Lorem Ipsum</Grid>
            <Grid xs={2}>
              {t('content.apprelease.technicalIntegration.username')}
            </Grid>
            <Grid xs={4}>Lorem Ipsum</Grid>
          </Grid>
        )}
      </form>

      <Box mb={2}>
        {technicalIntegrationNotification && (
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
                onCloseNotification={() =>
                  setTechnicalIntegrationNotification(false)
                }
              />
            </Grid>
          </Grid>
        )}
        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <Button
          startIcon={<HelpOutlineIcon />}
          sx={{ mr: 1 }}
          variant="outlined"
        >
          {t('content.apprelease.footerButtons.help')}
        </Button>
        <IconButton color="secondary" onClick={() => dispatch(decrement())}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Button
          disabled={showUserButton}
          onClick={() => dispatch(increment())}
          variant="contained"
          sx={{ float: 'right' }}
        >
          {t('content.apprelease.footerButtons.saveAndProceed')}
        </Button>
        <Button
          variant="outlined"
          name="send"
          sx={{ float: 'right', mr: 1 }}
          onClick={handleSubmit(onIntegrationSubmit)}
        >
          {t('content.apprelease.footerButtons.save')}
        </Button>
      </Box>
    </div>
  )
}
