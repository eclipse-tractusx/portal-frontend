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
} from '@catena-x/portal-shared-components'
import {
  type ConnectorDetailsType,
  useDeleteConnectorMutation,
} from 'features/connector/connectorApiSlice'
import { Box, Divider, Grid } from '@mui/material'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import { useState } from 'react'
import { error } from 'services/NotifyService'
import EditIcon from '@mui/icons-material/Edit'

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
  const [openDeleteConnector, setOpenDeleteConnector] = useState(false)
  const [deleteConnectorSuccess, setDeleteConnectorSuccess] = useState(false)
  const [deleteConnector] = useDeleteConnectorMutation()
  const [loading, setLoading] = useState<boolean>(false)
  const [enableConnectorUrl, setEnableConnectorUrl] = useState(true)
  const [enableConnectorName, setEnableConnectorName] = useState(true)

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
        overlayData?.technicalUser === null
          ? t('content.edcconnector.details.noTechnicalUserAvailable')
          : overlayData?.technicalUser,
    },
    {
      key: t('content.edcconnector.details.SdRegistration'),
      value: overlayData?.selfDescriptionDocumentId,
    },
  ]

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
          <Grid container spacing={2} sx={{ margin: '0px', padding: 0 }}>
            <Grid xs={11}>
              <Input
                label={
                  <Typography variant="body2">
                    {t('content.edcconnector.details.name')}
                  </Typography>
                }
                value={overlayData?.name ?? ''}
                disabled={enableConnectorName}
                sx={{ marginBottom: '20px' }}
              />
            </Grid>
            <Grid xs={1}>
              <EditIcon
                sx={{
                  color: '#0f71cb',
                  cursor: 'pointer',
                  mt: 8,
                }}
                onClick={() => {
                  setEnableConnectorName(false)
                }}
              />
            </Grid>
            <Grid xs={11}>
              <Input
                label={
                  <Typography variant="body2">
                    {t('content.edcconnector.details.url')}
                  </Typography>
                }
                value={overlayData?.connectorUrl ?? ''}
                disabled={enableConnectorUrl}
                sx={{ marginBottom: '20px' }}
              />
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
                }}
              />
            </Grid>
          </Grid>
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
                      checked={item.value === null}
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
                    <button className="document-button-link" onClick={() => {}}>
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
