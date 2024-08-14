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
} from '@catena-x/portal-shared-components'
import {
  type ConnectorDetailsType,
  useDeleteConnectorMutation,
  useUpdateConnectorUrlMutation,
} from 'features/connector/connectorApiSlice'
import { Box, Divider, Grid } from '@mui/material'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import { useEffect, useState } from 'react'
import { error, success } from 'services/NotifyService'
import EditIcon from '@mui/icons-material/Edit'
import Patterns from 'types/Patterns'
import { useFetchDocumentMutation } from 'features/serviceManagement/apiSlice'
import { download } from 'utils/downloadUtils'

interface DeleteConfirmationOverlayProps {
  openDialog?: boolean
  handleOverlayClose: React.MouseEventHandler
  overlayData?: ConnectorDetailsType
}

const ConnectorDetailsOverlay = ({
  openDialog = false,
  handleOverlayClose,
  overlayData,
}: DeleteConfirmationOverlayProps) => {
  const { t } = useTranslation()
  const [fetchDocumentById] = useFetchDocumentMutation()
  const [openDeleteConnector, setOpenDeleteConnector] = useState(false)
  const [deleteConnectorSuccess, setDeleteConnectorSuccess] = useState(false)
  const [deleteConnector] = useDeleteConnectorMutation()
  const [loading, setLoading] = useState<boolean>(false)
  const [enableConnectorUrl, setEnableConnectorUrl] = useState(true)
  const [updateConnectorUrl] = useUpdateConnectorUrlMutation()
  const [isLoading, setIsLoading] = useState(false)
  const [enableUrlApiErrorMsg, setEnableUrlApiErrorMsg] = useState(false)
  const [urlErrorMsg, setUrlErrorMsg] = useState('')
  const [connectorUrlValue, setConnectorUrlValue] = useState('')

  useEffect(() => {
    setConnectorUrlValue(overlayData?.connectorUrl ?? '')
  }, [overlayData])

  const detailsData = [
    {
      key: t('content.edcconnector.details.status'),
      value: overlayData?.status ?? '',
    },
    {
      key: t('content.edcconnector.details.type'),
      value: overlayData?.type ?? '',
    },
    {
      key: t('content.edcconnector.details.host'),
      value: overlayData?.hostCompanyName ?? '',
    },
    {
      key: t('content.edcconnector.details.location'),
      value: overlayData?.location ?? '',
    },
    {
      key: t('content.edcconnector.details.technicalUser'),
      value:
      overlayData?.technicalUser === null ? (
          t('content.edcconnector.details.noTechnicalUserAvailable')
        ) : (
          <a
            href={`/techuserdetails/${overlayData?.technicalUser?.id}`}
          >
            {overlayData?.technicalUser?.name}
          </a>
        ),
    },
    {
      key: t('content.edcconnector.details.SdRegistration'),
      value: overlayData?.selfDescriptionDocumentId,
    },
  ]

  const handleDownloadFn = async (documentId: string, documentName: string) => {
    if (overlayData?.id) {
      try {
        const response = await fetchDocumentById({
          appId: overlayData.id,
          documentId,
        }).unwrap()

        const fileType = response.headers.get('content-type')
        const file = response.data
        download(file, fileType, documentName)
      } catch (err) {
        error(t('content.edcconnector.details.errormessage'), '', '')
      }
    }
  }

  const handleDeleteConnector = async () => {
    setLoading(true)
    await deleteConnector(overlayData?.id ?? '')
      .unwrap()
      .then(() => {
        setDeleteConnectorSuccess(true)
        setLoading(false)
      })
      .catch((err) => {
        setDeleteConnectorSuccess(false)
        setLoading(false)
        error(
          err.status === 409
            ? err.data.title
            : t('content.edcconnector.details.errormessage'),
          '',
          err
        )
      })
  }

  const handleUrlSubmit = async () => {
    setIsLoading(true)

    if (overlayData?.id) {
      const saveData = {
        connectorId: overlayData.id,
        body: {
          connectorUrl: connectorUrlValue,
        },
      }

      await updateConnectorUrl(saveData)
        .unwrap()
        .then(() => {
          success(t('content.edcconnector.details.urlUpdatedSuccessfully'))
          setEnableConnectorUrl(true)
        })
        .catch(() => {
          setEnableUrlApiErrorMsg(true)
        })
      setIsLoading(false)
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
      {openDeleteConnector && (
        <Dialog
          open={openDeleteConnector}
          sx={{
            '.MuiDialog-paper': {
              maxWidth: '45%',
            },
          }}
        >
          <DialogHeader
            title={t('content.edcconnector.details.deleteConnector')}
            intro={overlayData?.name ?? ''}
          />
          <DialogContent
            sx={{
              textAlign: 'center',
              marginBottom: '25px',
              padding: '0px 80px 20px 80px',
            }}
          >
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              {deleteConnectorSuccess
                ? t('content.edcconnector.details.connectorDeletedSuccessfully')
                : t('content.edcconnector.details.wantToDeleteConnector')}
            </Typography>
          </DialogContent>
          <DialogActions>
            {deleteConnectorSuccess ? (
              <Button
                variant="outlined"
                onClick={(e) => {
                  handleOverlayClose(e)
                  setOpenDeleteConnector(false)
                }}
              >
                {t('global.actions.close')}
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => {
                  setOpenDeleteConnector(false)
                }}
              >
                {t('global.actions.cancel')}
              </Button>
            )}

            {loading ? (
              <Box
                sx={{
                  width: '110px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <CircleProgress
                  size={40}
                  step={1}
                  interval={0.1}
                  colorVariant={'primary'}
                  variant={'indeterminate'}
                  thickness={8}
                />
              </Box>
            ) : (
              !deleteConnectorSuccess && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleDeleteConnector()
                  }}
                >
                  {t('content.edcconnector.details.delete')}
                </Button>
              )
            )}
          </DialogActions>
        </Dialog>
      )}
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
          intro={overlayData?.name ?? ''}
        />
        <DialogContent
          sx={{
            textAlign: 'center',
            marginBottom: '25px',
            padding: '0px 80px 20px 80px',
          }}
        >
          <Box sx={{ display: 'inline-flex', textAlign: 'center' }}>
            <Typography variant="body2" sx={{ mt: 1, mr: 2 }}>
              {t('content.edcconnector.details.configureYourConnectorDetails')}
            </Typography>
            <Button onClick={() => {}} variant="outlined" size="small" disabled>
              {t('content.edcconnector.details.learnMore')}
            </Button>
          </Box>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Input
                label={
                  <Typography variant="body2">
                    {t('content.edcconnector.details.name')}
                  </Typography>
                }
                value={overlayData?.name ?? ''}
                disabled={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid xs={11}>
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
            <Grid xs={1}>
              <EditIcon
                sx={{
                  color: '#0f71cb',
                  cursor: 'pointer',
                  mt: 8,
                }}
                onClick={() => {
                  setEnableConnectorUrl(false)
                  setEnableUrlApiErrorMsg(false)
                }}
              />
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
                      setConnectorUrlValue(overlayData?.connectorUrl ?? '')
                    }}
                    size="small"
                    sx={{ mr: 2 }}
                  >
                    {t('global.actions.cancel')}
                  </Button>
                  {isLoading ? (
                    <LoadingButton
                      size="small"
                      variant="contained"
                      onButtonClick={() => {
                        // do nothing
                      }}
                      loading={isLoading}
                      label={`${t('global.actions.confirm')}`}
                      loadIndicator="Loading..."
                    />
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={handleUrlSubmit}
                      size="small"
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
                    <Typography variant="body2" sx={{ textAlign: 'left' }}>
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
                {overlayData?.selfDescriptionDocumentId === null ? (
                  t('content.edcconnector.details.noDocumentAvailable')
                ) : (
                  <>
                    <ArticleOutlinedIcon sx={{ color: '#9c9c9c' }} />
                    <button
                      className="document-button-link"
                      onClick={() =>
                        overlayData?.selfDescriptionDocumentId &&
                        handleDownloadFn(
                          overlayData?.selfDescriptionDocumentId,
                          t('content.edcconnector.details.SdDocument')
                        )
                      }
                    >
                      {t(
                        'content.edcconnector.details.selfDescriptionDocument'
                      )}
                    </button>
                  </>
                )}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ margin: '20px auto', color: 'black' }} />
          <Button
            variant="outlined"
            onClick={() => {
              setOpenDeleteConnector(true)
            }}
            size="small"
            sx={{ float: 'right' }}
          >
            {t('content.edcconnector.details.deleteConnector')}
          </Button>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={(e) => {
              handleOverlayClose(e)
            }}
          >
            {t('global.actions.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConnectorDetailsOverlay
