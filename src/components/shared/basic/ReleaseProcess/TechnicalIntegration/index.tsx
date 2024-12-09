/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
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
  Button,
  Checkbox,
  Chip,
  CustomAccordion,
  LoadingButton,
  Radio,
  SelectList,
  Typography,
} from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import { Box, Grid, useMediaQuery, useTheme, Divider } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  appIdSelector,
  appRedirectStatusSelector,
  decrement,
  increment,
  setAppRedirectStatus,
} from 'features/appManagement/slice'
import { Dropzone, type DropzoneFile } from 'components/shared/basic/Dropzone'
import { isString } from 'lodash'
import {
  useDeleteRolesMutation,
  useFetchAppStatusQuery,
  useFetchAppRolesDataQuery,
  useFetchTechnicalUserProfilesQuery,
  useFetchUserRolesQuery,
  useSaveTechnicalUserProfilesMutation,
  useUpdateRoleDataMutation,
  type updateRolePayload,
} from 'features/appManagement/apiSlice'
import { setAppStatus } from 'features/appManagement/actions'
import SnackbarNotificationWithButtons from '../components/SnackbarNotificationWithButtons'
import { ErrorType } from 'features/appManagement/types'
import { error, success } from 'services/NotifyService'
import { ButtonLabelTypes } from '..'

export default function TechnicalIntegration() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const hasDispatched = useRef(false)
  const [
    technicalIntegrationNotification,
    setTechnicalIntegrationNotification,
  ] = useState(false)
  const [technicalIntegrationSnackbar, setTechnicalIntegrationSnackbar] =
    useState<boolean>(false)
  const [rolesPreviews, setRolesPreviews] = useState<string[]>([])
  const [rolesDescription, setRolesDescription] = useState<string[]>([])
  const appId = useSelector(appIdSelector)
  const appRedirectStatus = useSelector(appRedirectStatusSelector)
  const fetchAppStatus = useFetchAppStatusQuery(appId ?? '', {
    refetchOnMountOrArgChange: true,
  }).data
  const { data, refetch: refetchRolesData } = useFetchAppRolesDataQuery(
    appId ?? '',
    {
      refetchOnMountOrArgChange: true,
    }
  )
  const [updateRoleData, { isLoading }] = useUpdateRoleDataMutation()
  const [deleteRoles] = useDeleteRolesMutation()
  const [uploadCSVError, setUploadCSVError] = useState(false)
  const [enableErrorMessage, setEnableErrorMessage] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  })
  const fetchUserRoles = useFetchUserRolesQuery().data
  const {
    data: fetchTechnicalUserProfiles,
    refetch: refetchTechnicalUserProfiles,
  } = useFetchTechnicalUserProfilesQuery(appId ?? '', {
    refetchOnMountOrArgChange: true,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [saveTechnicalUserProfiles] = useSaveTechnicalUserProfilesMutation()
  const [techUserProfiles, setTechUserProfiles] = useState<string[]>([])
  const [enableUserProfilesErrorMessage, setEnableUserProfilesErrorMessage] =
    useState(false)
  const [selectedEncoding, setSelectedEncoding] = useState<string>('UTF-8')
  const [uploadFileInfo, setUploadFileInfo] = useState<DropzoneFile[]>([])
  const technicalUserNone = 'NONE'
  const unicodeSelectItems = [
    {
      id: 1,
      title: 'UTF-8',
      value: 'UTF-8',
    },
    {
      id: 2,
      title: 'ISO-8859-1',
      value: 'ISO-8859-1',
    },
    {
      id: 3,
      title: 'ISO-8859-4',
      value: 'ISO-8859-4',
    },
    {
      id: 4,
      title: 'ISO-8859-5',
      value: 'ISO-8859-5',
    },
    {
      id: 5,
      title: 'US-ASCII',
      value: 'US-ASCII',
    },
  ]

  useEffect(() => {
    csvPreview(uploadFileInfo)
  }, [selectedEncoding])

  const userProfiles = useMemo(
    () =>
      fetchTechnicalUserProfiles?.[0]?.userRoles.map(
        (i: { roleId: string }) => i.roleId
      ) ?? [],
    [fetchTechnicalUserProfiles]
  )

  useEffect(() => {
    // Set default value as "None" when user profiles don't have any roles
    // Initially, value is "None"
    setTechUserProfiles(
      userProfiles.length > 0 ? userProfiles : [technicalUserNone]
    )
  }, [userProfiles])

  const defaultValues = {
    uploadAppRoles: '',
    technicalUserProfiles: [],
  }

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    mode: 'onChange',
  })

  useEffect(() => {
    if (fetchAppStatus) dispatch(setAppStatus(fetchAppStatus))
  }, [dispatch, fetchAppStatus])

  const handleCheckedUserProfiles = (item: string, select: boolean) => {
    if (techUserProfiles && techUserProfiles[0] === technicalUserNone) {
      setTechUserProfiles([...[], item])
    } else {
      const isSelected = techUserProfiles?.includes(item)
      let selectedProfiles: string[] = []
      if (!isSelected && select) {
        selectedProfiles = [...techUserProfiles, item]
      } else if (isSelected && !select) {
        const oldTechUserProfiles = [...techUserProfiles]
        oldTechUserProfiles.splice(oldTechUserProfiles.indexOf(item), 1)
        selectedProfiles = [...oldTechUserProfiles]
      }
      setEnableUserProfilesErrorMessage(selectedProfiles?.length === 0)
      setTechUserProfiles(selectedProfiles)
    }
  }

  const selectUserProfiles = (type: string, select: boolean, item: string) => {
    if (type === 'checkbox') {
      handleCheckedUserProfiles(item, select)
    } else if (type === 'radio') {
      setTechUserProfiles([...[], item])
    }
  }

  const handleSaveSuccess = (buttonLabel: string) => {
    setEnableUserProfilesErrorMessage(false)
    setEnableErrorMessage(false)
    refetchTechnicalUserProfiles()
    if (buttonLabel === ButtonLabelTypes.SAVE_AND_PROCEED) dispatch(increment())
    else success(t('content.apprelease.appReleaseForm.dataSavedSuccessMessage'))
  }

  const handleSaveAndProceed = () => {
    return (
      (techUserProfiles.length === userProfiles.length &&
        techUserProfiles.every((item) => userProfiles?.includes(item))) ||
      (fetchTechnicalUserProfiles?.length === 0 &&
        techUserProfiles?.[0] === technicalUserNone)
    )
  }

  const onIntegrationSubmit = async (
    _submitData: unknown,
    buttonLabel: string
  ) => {
    if (
      buttonLabel === ButtonLabelTypes.SAVE &&
      (data?.length === 0 || techUserProfiles.length === 0)
    ) {
      data?.length === 0 && setEnableErrorMessage(true)
      techUserProfiles.length === 0 && setEnableUserProfilesErrorMessage(true)
    } else if (handleSaveAndProceed()) {
      buttonLabel === ButtonLabelTypes.SAVE_AND_PROCEED && dispatch(increment())
    } else if (
      !(
        techUserProfiles.length === userProfiles.length &&
        techUserProfiles.every((item) => userProfiles?.includes(item))
      )
    ) {
      setLoading(true)
      const updateData = {
        appId,
        body: [
          {
            technicalUserProfileId:
              fetchTechnicalUserProfiles?.[0]?.technicalUserProfileId ?? null,
            userRoleIds:
              techUserProfiles && techUserProfiles[0] === technicalUserNone
                ? []
                : techUserProfiles,
          },
        ],
      }

      if (updateData)
        await saveTechnicalUserProfiles(updateData)
          .unwrap()
          .then(() => {
            handleSaveSuccess(buttonLabel)
          })
          .catch((err) => {
            error(
              t(
                'content.apprelease.technicalIntegration.technicalUserProfileError'
              ),
              '',
              err
            )
          })
      setLoading(false)
    }
  }

  const csvPreview = (files: File[]) => {
    files
      .filter(
        (file: File) =>
          file.type === 'text/csv' || file.type === 'application/vnd.ms-excel'
      )
      .forEach((file: File) => {
        const reader = new FileReader()
        reader.onabort = () => {
          console.log('file reading was aborted')
        }
        reader.onerror = () => {
          console.log('file reading has failed')
        }
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
            const roleDescription = str
              ?.split('\n')
              .filter((item) => item !== '')
              .map((item) => item.substring(item.indexOf(';') + 1))

            setRolesPreviews(roles?.splice(1))
            setRolesDescription(roleDescription?.splice(1))
            setUploadCSVError(false)
          } else {
            setRolesPreviews([])
            setRolesDescription([])
            setUploadCSVError(true)
          }
        }
        reader.readAsText(file, selectedEncoding)
      })
  }

  const postRoles = async () => {
    const rolesDescriptionData = rolesPreviews.map((data, i) => [
      data,
      rolesDescription[i],
    ])

    const updateRolesData = {
      appId,
      body: rolesDescriptionData?.map((item) => ({
        role: item[0],
        descriptions: [
          {
            languageCode: 'en',
            description: item[1],
          },
        ],
      })),
    }

    if (rolesDescriptionData?.length > 0) {
      await updateRoleData(updateRolesData)
        .unwrap()
        .then(() => {
          setRolesPreviews([])
          setRolesDescription([])
          setEnableErrorMessage(false)
          reset(defaultValues)
          refetchRolesData()
        })
        .catch((err) => {
          error(
            t('content.apprelease.technicalIntegration.roleUpdateError'),
            '',
            err
          )
        })
    }
  }

  const onChipDelete = (roleId: string) => {
    deleteRoles({
      appId,
      roleId,
    })
      .unwrap()
      .then(() => {
        refetchRolesData()
        success(
          t('content.apprelease.technicalIntegration.roleDeleteSuccessMessage')
        )
      })
      .catch((err) => {
        error(t('content.apprelease.appReleaseForm.errormessage'), '', err)
      })
  }

  const onBackIconClick = () => {
    if (fetchAppStatus) dispatch(setAppStatus(fetchAppStatus))
    dispatch(setAppRedirectStatus(false))
    dispatch(decrement())
  }

  useEffect(() => {
    if (hasDispatched.current) return
    if (data && data.length > 0 && appRedirectStatus) {
      dispatch(increment())
      hasDispatched.current = true
    }
  }, [fetchAppStatus, data, hasDispatched])

  return (
    <>
      <Typography variant="h3" mt={10} mb={4} align="center">
        {t('content.apprelease.technicalIntegration.headerTitle')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={11} sx={{ mr: 'auto', ml: 'auto', mb: 4 }}>
          <Typography variant="body2" align="center">
            {t('content.apprelease.technicalIntegration.headerDescription')}
            {t(
              'content.apprelease.technicalIntegration.uploadRolesDescription'
            )}
          </Typography>
        </Grid>
      </Grid>

      <form className="header-description">
        <Typography variant="h5" mb={2}>
          <>
            {t('content.apprelease.technicalIntegration.step1Header')}
            <span style={{ color: 'red' }}> *</span>
          </>
        </Typography>
        <Typography variant="body2" mb={4}>
          {t('content.apprelease.technicalIntegration.step1HeaderDescription')}
        </Typography>

        <Grid item xs={12} sx={{ mr: 2, mt: 4, mb: 5, textAlign: 'center' }}>
          <a
            href="../../template_app_role_upload.csv"
            download
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant="outlined"
              endIcon={<FileDownloadOutlinedIcon />}
              size="small"
              sx={{ fontSize: '16px' }}
            >
              {t('content.apprelease.technicalIntegration.template')}
            </Button>
          </a>
          <Button
            sx={{ ml: 2, fontSize: '16px' }}
            size="small"
            variant="contained"
            color="secondary"
            onClick={() =>
              window.open(
                '/documentation/?path=user%2F04.+App%28s%29%2F02.+App+Release+Process%2F04.+Technical+Integration.md',
                '_blank',
                'noopener'
              )
            }
          >
            {t('content.apprelease.technicalIntegration.getHelp')}
          </Button>
        </Grid>
        <Controller
          name={'uploadAppRoles'}
          control={control}
          render={({ field: { onChange: reactHookFormOnChange } }) => (
            <Dropzone
              onChange={(files, _addedFiles, deletedFiles) => {
                if (deletedFiles?.length) {
                  setRolesPreviews([])
                  setRolesDescription([])
                  setUploadCSVError(false)
                }
                reactHookFormOnChange(files[0]?.name)
                trigger('uploadAppRoles')
                csvPreview(files)
                setUploadFileInfo(files)
              }}
              acceptFormat={{
                'text/csv': ['.csv'],
                'application/vnd.ms-excel': ['.csv'],
              }}
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
        {errors?.uploadAppRoles?.type === ErrorType.REQUIRED && (
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
          <Box
            sx={{ pl: 2, pr: 2, pb: 5, pt: 3, mt: 4 }}
            style={{
              background: '#FFFFFF',
              boxShadow: '0px 20px 40px rgba(80, 80, 80, 0.3)',
              borderRadius: '24px',
            }}
          >
            <Box>
              <Typography variant="h4" textAlign="center">
                {t('content.apprelease.technicalIntegration.rolesPreview')}
              </Typography>
              <Grid item container xs={12}>
                <Grid item md={6} xs={12} sx={{ pl: 2, pr: 2, pb: 2 }}>
                  <SelectList
                    sx={{ mb: 2 }}
                    defaultValue={unicodeSelectItems[0]}
                    value={selectedEncoding}
                    placeholder={t(
                      'content.apprelease.technicalIntegration.encodingPlaceholder'
                    )}
                    items={unicodeSelectItems}
                    label={t(
                      'content.apprelease.technicalIntegration.encoding'
                    )}
                    onChangeItem={(e) => {
                      setSelectedEncoding(e.value as string)
                    }}
                    keyTitle={'title'}
                    disableClearable={true}
                  />
                </Grid>
              </Grid>
            </Box>
            <Grid item mb={5} container xs={12}>
              {rolesPreviews?.map((role: string, index) => (
                <Grid
                  item
                  md={6}
                  xs={12}
                  key={role}
                  sx={{
                    pl: !isMobile && index % 2 === 0 ? 0 : 1,
                    pr: !isMobile && index % 2 === 0 ? 1 : 0,
                  }}
                >
                  <CustomAccordion
                    items={[
                      {
                        expanded: false,
                        id: role,
                        title: '',
                        titleElement: (
                          <Chip
                            key={role}
                            label={role}
                            withIcon={false}
                            type="progress"
                            variant="filled"
                            color="info"
                            sx={{
                              '.MuiChip-label': {
                                fontSize: '14px',
                              },
                            }}
                          />
                        ),
                        color: 'white',
                        children: (
                          <Typography variant="caption3">
                            {rolesDescription?.[index]}
                          </Typography>
                        ),
                      },
                    ]}
                  />
                </Grid>
              ))}
            </Grid>

            {rolesPreviews?.length > 0 && (
              <LoadingButton
                loading={isLoading}
                variant="contained"
                onButtonClick={postRoles}
                sx={{
                  textAlign: 'center',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'flex',
                }}
                startIcon={<FileUploadOutlinedIcon />}
                loadIndicator={t(
                  'content.apprelease.technicalIntegration.uploadAppRolesButton'
                )}
                label={t(
                  'content.apprelease.technicalIntegration.uploadAppRolesButton'
                )}
                fullWidth={false}
              />
            )}
          </Box>
        )}
        <Box>
          {data && data.length > 0 ? (
            <>
              <Typography variant="h4" mb={4} mt={4} textAlign={'center'}>
                {t(
                  'content.apprelease.technicalIntegration.successfullyUploadedAppRoles'
                )}
              </Typography>
              <Grid item container xs={12}>
                {data?.map((role: updateRolePayload, index) => (
                  <Grid
                    item
                    md={6}
                    xs={12}
                    key={role.role}
                    sx={{
                      pl: !isMobile && index % 2 === 0 ? 0 : 1,
                      pr: !isMobile && index % 2 === 0 ? 1 : 0,
                    }}
                  >
                    <CustomAccordion
                      items={[
                        {
                          expanded: false,
                          id: role.role,
                          title: '',
                          titleElement: (
                            <Chip
                              key={role.role}
                              label={role.role}
                              withIcon={true}
                              type="delete"
                              variant="filled"
                              color="info"
                              sx={{
                                '.MuiChip-label': {
                                  fontSize: '14px',
                                },
                              }}
                              handleDelete={() => {
                                onChipDelete(role.roleId ?? '')
                              }}
                            />
                          ),
                          color: 'white',
                          children: (
                            <Typography variant="caption3">
                              {role.descriptions?.[0].description}
                            </Typography>
                          ),
                        },
                      ]}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <Box className="no-roles-box">
              <Typography variant="h4" mb={4} mt={4} textAlign={'center'}>
                {`Currently no roles loaded for app (${fetchAppStatus?.title})`}
              </Typography>
            </Box>
          )}
        </Box>

        {enableErrorMessage && (
          <Typography variant="body2" className="file-error-msg">
            {t('content.apprelease.technicalIntegration.roleUploadIsMandatory')}
          </Typography>
        )}
        <Divider className="form-divider" />
        <Typography variant="h5" mb={2}>
          <>
            {t('content.apprelease.technicalIntegration.step2Header')}
            <span style={{ color: 'red' }}> *</span>
          </>
        </Typography>
        <Typography variant="body2" mb={4}>
          {t('content.apprelease.technicalIntegration.step2HeaderDescription')}
        </Typography>
        <Grid container spacing={1.5} item>
          {fetchUserRoles?.map((item) => (
            <Grid item md={12} className="userRoles" key={item.roleId}>
              <Checkbox
                label={`${item.roleName} (${item.roleDescription ?? ''})`}
                checked={techUserProfiles.some((role) => item.roleId === role)}
                onChange={(e) => {
                  selectUserProfiles('checkbox', e.target.checked, item.roleId)
                }}
                size="small"
              />
            </Grid>
          ))}
          <Grid item md={12} className="userRoles">
            <Radio
              name="radio-buttons"
              size="small"
              checked={
                techUserProfiles && techUserProfiles[0] === technicalUserNone
              }
              label={`${t(
                'content.apprelease.technicalIntegration.noneOption'
              )}`}
              onChange={(e) => {
                selectUserProfiles('radio', e.target.checked, technicalUserNone)
              }}
            />
          </Grid>
        </Grid>
        {enableUserProfilesErrorMessage && (
          <Typography variant="body2" className="file-error-msg">
            {t(
              'content.apprelease.technicalIntegration.technicalUserSetupMandatory'
            )}
          </Typography>
        )}
      </form>
      <SnackbarNotificationWithButtons
        pageNotification={technicalIntegrationNotification}
        pageSnackbar={technicalIntegrationSnackbar}
        setPageNotification={setTechnicalIntegrationNotification}
        setPageSnackbar={setTechnicalIntegrationSnackbar}
        onBackIconClick={onBackIconClick}
        onSave={handleSubmit((data) =>
          onIntegrationSubmit(data, ButtonLabelTypes.SAVE)
        )}
        onSaveAndProceed={handleSubmit((data) =>
          onIntegrationSubmit(data, ButtonLabelTypes.SAVE_AND_PROCEED)
        )}
        pageNotificationsObject={{
          title: t('content.apprelease.appReleaseForm.error.title'),
          description: t('content.apprelease.appReleaseForm.error.message'),
        }}
        helpUrl={
          '/documentation/?path=user%2F04.+App%28s%29%2F02.+App+Release+Process%2F04.+Technical+Integration.md'
        }
        isValid={
          data !== undefined &&
          data &&
          data?.length > 0 &&
          techUserProfiles?.length > 0
        }
        loader={loading}
      />
    </>
  )
}
