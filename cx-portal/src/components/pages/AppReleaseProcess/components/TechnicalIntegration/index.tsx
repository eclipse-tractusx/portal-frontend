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
  Button,
  Chip,
  IconButton,
  LoadingButton,
  PageNotifications,
  PageSnackbar,
  Typography,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Divider, Box, Grid } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  appIdSelector,
  decrement,
  increment,
} from 'features/appManagement/slice'
import { Dropzone } from 'components/shared/basic/Dropzone'
import { isString } from 'lodash'
import {
  rolesType,
  updateRoleType,
  useDeleteRolesMutation,
  useFetchAppStatusQuery,
  useFetchRolesDataQuery,
  useUpdateRoleDataMutation,
} from 'features/appManagement/apiSlice'
import { setAppStatus } from 'features/appManagement/actions'

export default function TechnicalIntegration() {
  const { t } = useTranslation()
  const [
    technicalIntegrationNotification,
    setTechnicalIntegrationNotification,
  ] = useState(false)
  const [technicalIntegrationSnackbar, setTechnicalIntegrationSnackbar] =
    useState<boolean>(false)
  const [snackBarType, setSnackBarType] = useState<'error' | 'success'>(
    'success'
  )
  const [snackBarMessage, setSnackBarMessage] = useState<string>(
    t('content.apprelease.appReleaseForm.dataSavedSuccessMessage')
  )

  const dispatch = useDispatch()
  const [rolesPreviews, setRolesPreviews] = useState<string[]>([])
  // To-Do : the below code will get enhanced again in R.3.1
  // const [disableCreateClient, setDisableCreateClient] = useState(true)
  // const [createClientSuccess, setCreateClientSuccess] = useState(false)
  // const [enableTestUserButton, setEnableTestUserButton] = useState(false)
  // const [showUserButton, setShowUserButton] = useState(true)
  const appId = useSelector(appIdSelector)
  const fetchAppStatus = useFetchAppStatusQuery(appId ?? '', {
    refetchOnMountOrArgChange: true,
  }).data
  const { data, refetch } = useFetchRolesDataQuery(appId ?? '', {
    refetchOnMountOrArgChange: true,
  })
  const [updateRoleData, { isLoading }] = useUpdateRoleDataMutation()
  const [deleteRoles] = useDeleteRolesMutation()
  const [uploadCSVError, setUploadCSVError] = useState(false)

  const defaultValues = {
    // To-Do : the below code will get enhanced again in R.3.1
    // clientId: '',
    // URL: '',
    uploadAppRoles: '',
  }

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  useEffect(() => {
    dispatch(setAppStatus(fetchAppStatus))
  }, [dispatch, fetchAppStatus])

  const onIntegrationSubmit = async (data: any, buttonLabel: string) => {
    buttonLabel === 'saveAndProceed' && dispatch(increment())
    buttonLabel === 'save' && setTechnicalIntegrationSnackbar(true)
  }

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
          const CSVCells = str
            ?.split('\n')
            .filter((item) => item !== '')
            .map((item) => item)

          if (
            CSVCells[0] === 'roles;description\r' ||
            CSVCells[0] === 'roles;description'
          ) {
            const roles = str
              ?.split('\n')
              .filter((item) => item !== '')
              .map((item) => item.substring(0, item.indexOf(';')))

            setRolesPreviews(roles?.splice(1))
            setUploadCSVError(false)
          } else {
            setRolesPreviews([])
            setUploadCSVError(true)
          }
        }
        reader.readAsText(file)
      })
  }

  const postRoles = async () => {
    const updateRolesData: updateRoleType = {
      appId: appId,
      body: rolesPreviews?.map((item) => ({
        role: item,
        descriptions: [
          {
            languageCode: 'en',
            description: '',
          },
        ],
      })),
    }

    if (rolesPreviews.length > 0) {
      await updateRoleData(updateRolesData)
        .unwrap()
        .then((data) => {
          setRolesPreviews([])
          reset(defaultValues)
          refetch()
        })
        .catch((error) => {
          console.error(error, 'ERROR WHILE UPDATING ROLES')
        })
    }
  }

  const onChipDelete = (roleId: string) => {
    deleteRoles({
      appId: appId,
      roleId: roleId,
    })
      .unwrap()
      .then(() => {
        refetch()
        setSnackBarType('success')
        setSnackBarMessage(
          t('content.apprelease.appReleaseForm.roleDeleteSuccessMessage')
        )
        setTechnicalIntegrationSnackbar(true)
      })
      .catch((error) => {
        setSnackBarType('error')
        setSnackBarMessage(t('content.apprelease.appReleaseForm.errormessage'))
        setTechnicalIntegrationSnackbar(true)
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
            {t(
              'content.apprelease.technicalIntegration.uploadRolesDescription'
            )}
          </Typography>
          <Grid item container xs={12} mt={2}>
            <Grid item xs={6}>
              <a
                href="../../app-provider-role-upload-example.csv"
                download
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <ArrowForwardIcon />
                {t('content.apprelease.technicalIntegration.template')}
              </a>
            </Grid>
            <Grid item xs={6}>
              <a
                href="https://portal.dev.demo.catena-x.net/documentation/?path=docs%2F04.+App%28s%29%2FRelease-Process%2FApp+Release+Workflow.md"
                target="_blank"
                style={{ display: 'flex', justifyContent: 'center' }}
                rel="noreferrer"
              >
                <ArrowForwardIcon />
                {t('content.apprelease.technicalIntegration.getHelp')}
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <form className="header-description">
        {/* To-Do : the below code will get enhanced again in R.3.1 */}
        {/* <Typography variant="h5" mb={4}>
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
        </Typography> */}
        <Controller
          name={'uploadAppRoles'}
          control={control}
          render={({ field: { onChange: reactHookFormOnChange, value } }) => (
            <Dropzone
              onChange={(files, addedFiles, deletedFiles) => {
                if (deletedFiles?.length) {
                  setRolesPreviews([])
                }
                reactHookFormOnChange(files[0]?.name)
                trigger('uploadAppRoles')
                csvPreview(files)
              }}
              acceptFormat={{ 'text/csv': ['.csv'] }}
              maxFilesToUpload={1}
              enableDeleteOverlay={true}
              deleteOverlayTranslation={{
                title: '',
                content: t(
                  'content.apprelease.technicalIntegration.deleteOverlayContent'
                ),
                action_no: `${t('global.actions.no')}`,
                action_yes: `${t('global.actions.yes')}`,
              }}
            />
          )}
        />
        {errors?.uploadAppRoles?.type === 'required' && (
          <Typography variant="body2" className="file-error-msg">
            {t('content.apprelease.appReleaseForm.fileUploadIsMandatory')}
          </Typography>
        )}
        {uploadCSVError && (
          <Typography variant="body2" className="file-error-msg">
            {t(
              'content.apprelease.technicalIntegration.incorrectCSVFileFormat'
            )}
          </Typography>
        )}
        {rolesPreviews?.length > 0 && (
          <>
            <Typography variant="h6" mb={2} textAlign="center">
              {t('content.apprelease.technicalIntegration.rolesPreview')}
            </Typography>
            <Grid item container xs={12}>
              {rolesPreviews?.map((role: string) => (
                <Grid item xs={6} key={role}>
                  <Chip
                    key={role}
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
        <Box textAlign="center">
          {/* <Button
            variant="contained"
            sx={{ mr: 2, mt: 3 }}
            onClick={postRoles}
            // To-Do : the below code will get enhanced again in R.3.1
            // disabled={!createClientSuccess}
          >
            {getValues().uploadAppRoles === ''
              ? t(
                  'content.apprelease.technicalIntegration.clickToOpenDialogBox'
                )
              : t(
                  'content.apprelease.technicalIntegration.uploadAppRolesButton'
                )}
          </Button> */}

          {rolesPreviews.length > 0 && (
            <LoadingButton
              loading={isLoading}
              variant="contained"
              onButtonClick={postRoles}
              sx={{
                textAlign: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '30px',
              }}
              loadIndicator={t(
                'content.apprelease.technicalIntegration.uploadAppRolesButton'
              )}
              label={t(
                'content.apprelease.technicalIntegration.uploadAppRolesButton'
              )}
              fullWidth={false}
            />
          )}
          <Typography variant="h4" mb={4} mt={4}>
            {t(
              'content.apprelease.technicalIntegration.successfullyUploadedAppRoles'
            )}
          </Typography>

          {data && data.length > 0 ? (
            <Grid item container xs={12}>
              {data?.map((role: rolesType) => (
                <Grid
                  item
                  xs={6}
                  key={role.roleId}
                  style={{ textAlign: 'left' }}
                >
                  <Chip
                    key={role.roleId}
                    label={role.role}
                    withIcon={true}
                    type="delete"
                    variant="filled"
                    color="secondary"
                    sx={{ mb: 1, ml: 1, mr: 1, mt: 1 }}
                    handleDelete={() => onChipDelete(role.roleId)}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box className="no-roles-box">
              <Typography variant="h4" mb={4} mt={4}>
                {`Currently no roles loaded for app (${fetchAppStatus?.title})`}
              </Typography>
            </Box>
          )}
        </Box>

        {/* To-Do : the below code will get enhanced again in R.3.1 */}
        {/* <Divider className="form-divider" />
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
        )} */}
      </form>

      <Box mb={2}>
        {technicalIntegrationNotification && (
          <Grid item container xs={12} sx={{ mb: 2 }}>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
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
        <PageSnackbar
          open={technicalIntegrationSnackbar}
          onCloseNotification={() => setTechnicalIntegrationSnackbar(false)}
          severity={snackBarType}
          description={snackBarMessage}
          autoClose={true}
        />
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
          // To-Do : the below code will get enhanced again in R.3.1
          // disabled={showUserButton}
          onClick={handleSubmit((data) =>
            onIntegrationSubmit(data, 'saveAndProceed')
          )}
          variant="contained"
          sx={{ float: 'right' }}
        >
          {t('content.apprelease.footerButtons.saveAndProceed')}
        </Button>
        <Button
          variant="outlined"
          name="send"
          sx={{ float: 'right', mr: 1 }}
          onClick={handleSubmit((data) => onIntegrationSubmit(data, 'save'))}
        >
          {t('content.apprelease.footerButtons.save')}
        </Button>
      </Box>
    </div>
  )
}
