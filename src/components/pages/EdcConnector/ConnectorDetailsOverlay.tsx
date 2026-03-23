/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  Button,
  DialogActions,
  DialogHeader,
  Input,
  Typography,
  Checkbox,
  CircleProgress,
  LoadingButton,
  IconButton,
} from '@arena2036/portal-shared-components-construct-x'
import {
  type ConnectorDetailsType,
  useUpdateConnectorUrlMutation,
  useFetchConnectorDetailsQuery,
  useFetchSdDocumentMutation,
} from 'features/connector/connectorApiSlice'
import { Box, Divider, Grid } from '@mui/material'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import { useEffect, useState } from 'react'
import { error, success } from 'services/NotifyService'
import EditIcon from '@mui/icons-material/Edit'
import Patterns from 'types/Patterns'
import { download } from 'utils/downloadUtils'
import { ROLES } from 'types/Constants'
import { userHasPortalRole } from 'services/AccessService'

interface DeleteConfirmationOverlayProps {
  openDialog?: boolean
  handleOverlayClose: React.MouseEventHandler
  overlayData?: ConnectorDetailsType
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  updateTableConnectorURL: any
}

const ConnectorDetailsOverlay = ({
  openDialog = false,
  handleOverlayClose,
  overlayData,
  updateTableConnectorURL,
}: DeleteConfirmationOverlayProps) => {
  const { t } = useTranslation()
  const [fetchSDDocument] = useFetchSdDocumentMutation()
  const {
    data: fetchConnectorDetails,
    isFetching,
    error: fetchError,
    refetch,
  } = useFetchConnectorDetailsQuery(overlayData?.id ?? '')
  const [enableConnectorUrl, setEnableConnectorUrl] = useState(true)
  const [updateConnectorUrl] = useUpdateConnectorUrlMutation()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [enableUrlApiErrorMsg, setEnableUrlApiErrorMsg] = useState(false)
  const [urlErrorMsg, setUrlErrorMsg] = useState('')
  const [connectorUrlValue, setConnectorUrlValue] = useState('')
  const [openApiErrorModal, setOpenApiErrorModal] = useState(false)
  const [apiErrorStatus, setApiErrorStatus] = useState('')

  useEffect(() => {
    setConnectorUrlValue(fetchConnectorDetails?.connectorUrl ?? '')
  }, [fetchConnectorDetails])

  useEffect(() => {
    if (openDialog && fetchError && 'data' in fetchError) {
      // Add an ESLint exception until there is a solution
      // eslint-disable-next-line
      const errorData = fetchError as any
      if (errorData?.data?.status >= 400 && errorData?.data?.status < 500)
        setApiErrorStatus('4xx')
      else if (errorData?.data?.status >= 500 && errorData?.data?.status < 600)
        setApiErrorStatus('5xx')
      setOpenApiErrorModal(true)
    }
  }, [fetchError])

  const detailsData = [
    {
      key: t('content.edcconnector.details.status'),
      value: fetchConnectorDetails?.status ?? '',
    },
    {
      key: t('content.edcconnector.details.type'),
      value: fetchConnectorDetails?.type ?? '',
    },
    {
      key: t('content.edcconnector.details.host'),
      value: fetchConnectorDetails?.hostCompanyName ?? '',
    },
    {
      key: t('content.edcconnector.details.location'),
      value: fetchConnectorDetails?.location ?? '',
    },
    {
      key: t('content.edcconnector.details.technicalUser'),
      value:
        fetchConnectorDetails?.technicalUser === null ? (
          t('content.edcconnector.details.noTechnicalUserAvailable')
        ) : (
          <a
            href={`/techuserdetails/${fetchConnectorDetails?.technicalUser?.id}`}
          >
            {fetchConnectorDetails?.technicalUser?.name}
          </a>
        ),
    },
    {
      key: t('content.edcconnector.details.SdRegistration'),
      value: fetchConnectorDetails?.selfDescriptionDocumentId,
    },
  ]

  const handleDownloadFn = async (documentId: string, documentName: string) => {
    if (fetchConnectorDetails?.id) {
      try {
        const response = await fetchSDDocument(documentId).unwrap()

        const fileType = response.headers.get('content-type')
        const file = response.data
        download(file, fileType, documentName)
      } catch (err) {
        error(t('content.edcconnector.details.errormessage'), '', '')
      }
    }
  }

  const handleUrlSubmit = async () => {
    setConfirmLoading(true)

    if (fetchConnectorDetails?.id) {
      const saveData = {
        connectorId: fetchConnectorDetails.id,
        body: {
          connectorUrl: connectorUrlValue,
        },
      }

      await updateConnectorUrl(saveData)
        .unwrap()
        .then(() => {
          success(t('content.edcconnector.details.urlUpdatedSuccessfully'))
          refetch()
          setEnableConnectorUrl(true)
          updateTableConnectorURL(true)
        })
        .catch(() => {
          setEnableUrlApiErrorMsg(true)
        })
      setConfirmLoading(false)
    }
  }

  const validateURL = (value: string) => {
    setConnectorUrlValue(value)
    if (!Patterns.URL.test(value.trim())) {
      setUrlErrorMsg(t('content.edcconnector.details.pleaseEnterValidURL'))
    } else {
      setUrlErrorMsg('')
    }
  }

  return (
    <div>
      {openApiErrorModal && (
        <Dialog
          open={openApiErrorModal}
          sx={{
            '.MuiDialog-paper': {
              maxWidth: '45%',
            },
          }}
        >
          <DialogHeader
            title={
              apiErrorStatus === '4xx'
                ? t('content.edcconnector.details.configureConnector')
                : t('content.edcconnector.details.viewEditConnectorData')
            }
            intro={
              apiErrorStatus === '5xx'
                ? t('content.edcconnector.details.featureNotAvailable')
                : ''
            }
            closeWithIcon={true}
            onCloseWithIcon={(e) => {
              setOpenApiErrorModal(false)
              handleOverlayClose(e)
              setEnableUrlApiErrorMsg(false)
            }}
          />
          <DialogContent
            sx={{
              textAlign: 'center',
              marginBottom: '25px',
              padding: '0px 80px 20px 80px',
            }}
          >
            {apiErrorStatus === '4xx' ? (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {t('content.edcconnector.details.apiErrorDesc1')}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {t('content.edcconnector.details.apiErrorDesc2')}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {t('content.edcconnector.details.apiErrorDesc3')}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {t('content.edcconnector.details.apiErrorDesc4')}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {t('content.edcconnector.details.apiErrorDesc5')}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {t('content.edcconnector.details.apiErrorDesc3')}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {t('content.edcconnector.details.apiErrorDesc4')}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={(e) => {
                setOpenApiErrorModal(false)
                handleOverlayClose(e)
                setEnableUrlApiErrorMsg(false)
              }}
            >
              {t('global.actions.close')}
            </Button>
            {apiErrorStatus === '4xx' &&
              (isFetching ? (
                <LoadingButton
                  size="small"
                  variant="contained"
                  onButtonClick={() => {
                    // do nothing
                  }}
                  loading={isFetching}
                  label={t('content.edcconnector.details.reload')}
                  loadIndicator="Loading..."
                />
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => {
                    refetch()
                  }}
                >
                  {t('content.edcconnector.details.reload')}
                </Button>
              ))}
          </DialogActions>
        </Dialog>
      )}

      {!openApiErrorModal && (
        <Dialog
          open={openDialog}
          sx={{
            '.MuiDialog-paper': {
              maxWidth: '45%',
            },
          }}
        >
          <DialogHeader
            title={t('content.edcconnector.details.heading')}
            intro={fetchConnectorDetails?.name ?? ''}
          />
          <DialogContent
            sx={{
              textAlign: 'center',
              marginBottom: '25px',
              padding: '0px 80px 20px 80px',
            }}
          >
            {isFetching ? (
              <div
                style={{
                  width: '100%',
                  height: '500px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CircleProgress
                  colorVariant="primary"
                  size={80}
                  thickness={8}
                  variant="indeterminate"
                />
              </div>
            ) : (
              <>
                <Box sx={{ display: 'inline-flex', textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ mt: 1, mr: 2 }}>
                    {t(
                      'content.edcconnector.details.configureYourConnectorDetails'
                    )}
                  </Typography>
                  <Button
                    onClick={() => {}}
                    variant="outlined"
                    size="small"
                    disabled
                  >
                    {t('content.edcconnector.details.learnMore')}
                  </Button>
                </Box>
                <Grid container spacing={2}>
                  <Grid xs={12} item>
                    <Input
                      label={
                        <Typography variant="body2">
                          {t('content.edcconnector.details.name')}
                        </Typography>
                      }
                      value={fetchConnectorDetails?.name ?? ''}
                      disabled={true}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid xs={11} item>
                    <Input
                      label={
                        <Typography variant="body2">
                          {t('content.edcconnector.details.url')}
                        </Typography>
                      }
                      value={connectorUrlValue}
                      disabled={enableConnectorUrl}
                      onChange={(e) => {
                        validateURL(e.target.value)
                      }}
                    />
                    <Typography
                      variant="label3"
                      sx={{
                        color: '#d32f2f',
                        mb: 2,
                        float: 'left',
                      }}
                    >
                      {urlErrorMsg}
                    </Typography>
                  </Grid>
                  <Grid xs={1} item>
                    <IconButton
                      size="small"
                      sx={{
                        mt: 8,
                      }}
                      onClick={() => {
                        setEnableConnectorUrl(false)
                        setEnableUrlApiErrorMsg(false)
                      }}
                      disabled={!userHasPortalRole(ROLES.MODIFY_CONNECTORS)}
                    >
                      <EditIcon
                        sx={{
                          color: '#0f71cb',
                          cursor: 'pointer',
                        }}
                      />
                    </IconButton>
                  </Grid>
                  {!enableConnectorUrl && (
                    <>
                      <Typography variant="label3">
                        {t('content.edcconnector.details.note')}
                      </Typography>
                      <Typography variant="caption3" sx={{ textAlign: 'left' }}>
                        {t('content.edcconnector.details.noteDesc')}
                      </Typography>
                      <Box
                        sx={{
                          textAlign: 'center',
                          margin: '16px auto',
                          display: 'flex',
                        }}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setEnableConnectorUrl(true)
                            setConnectorUrlValue(
                              fetchConnectorDetails?.connectorUrl ?? ''
                            )
                          }}
                          size="small"
                          sx={{ mr: 2 }}
                        >
                          {t('global.actions.cancel')}
                        </Button>
                        {confirmLoading ? (
                          <LoadingButton
                            size="small"
                            variant="contained"
                            onButtonClick={() => {
                              // do nothing
                            }}
                            loading={confirmLoading}
                            label={t('global.actions.confirm')}
                            loadIndicator="Loading..."
                          />
                        ) : (
                          <Button
                            variant="outlined"
                            onClick={handleUrlSubmit}
                            size="small"
                            disabled={urlErrorMsg !== ''}
                          >
                            {t('global.actions.submit')}
                          </Button>
                        )}
                      </Box>
                    </>
                  )}
                </Grid>
                {enableUrlApiErrorMsg && (
                  <Typography
                    variant="label3"
                    sx={{
                      color: '#d32f2f',
                    }}
                  >
                    {t('content.edcconnector.details.urlErrorMessage')}
                  </Typography>
                )}
                <Divider sx={{ margin: '20px auto', color: 'black' }} />
                {detailsData.map((item) => {
                  return (
                    <Grid
                      container
                      sx={{ mt: 0, alignContent: 'left' }}
                      key={item.key}
                    >
                      <Grid item sx={{ ml: 0, mr: 0 }} xs={3}>
                        <Typography variant="body2" sx={{ textAlign: 'left' }}>
                          {item.key}
                        </Typography>
                      </Grid>

                      {item.key ===
                      t('content.edcconnector.details.SdRegistration') ? (
                        <Grid item sx={{ ml: 0, mr: 0, float: 'left' }} xs={1}>
                          <Checkbox
                            checked={item.value !== null}
                            disabled={item.value === null}
                          />
                        </Grid>
                      ) : (
                        <Grid item sx={{ ml: 0, mr: 0 }} xs={8}>
                          <Typography
                            variant="body2"
                            sx={{ textAlign: 'left' }}
                          >
                            {item.value}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  )
                })}
                <Grid container sx={{ mt: 0, alignContent: 'left' }}>
                  <Grid item sx={{ ml: 0, mr: 0 }} xs={3}>
                    <Typography variant="body2" sx={{ textAlign: 'left' }}>
                      {t('content.edcconnector.details.SdDocument')}
                    </Typography>
                  </Grid>
                  <Grid item sx={{ ml: 0, mr: 0 }} xs={8}>
                    <Typography variant="body2" sx={{ textAlign: 'left' }}>
                      {fetchConnectorDetails?.selfDescriptionDocumentId ===
                      null ? (
                        t('content.edcconnector.details.noDocumentAvailable')
                      ) : (
                        <Box sx={{ display: 'flex' }}>
                          <ArticleOutlinedIcon
                            sx={{ color: '#9c9c9c', mr: 1 }}
                          />
                          <button
                            className="document-button-link"
                            onClick={() =>
                              fetchConnectorDetails?.selfDescriptionDocumentId &&
                              handleDownloadFn(
                                fetchConnectorDetails?.selfDescriptionDocumentId,
                                t('content.edcconnector.details.SdDocument')
                              )
                            }
                          >
                            {t(
                              'content.edcconnector.details.selfDescriptionDocument'
                            )}
                          </button>
                        </Box>
                      )}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ margin: '20px auto', color: 'black' }} />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={(e) => {
                handleOverlayClose(e)
                setUrlErrorMsg('')
                setEnableUrlApiErrorMsg(false)
              }}
            >
              {t('global.actions.close')}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}

export default ConnectorDetailsOverlay
