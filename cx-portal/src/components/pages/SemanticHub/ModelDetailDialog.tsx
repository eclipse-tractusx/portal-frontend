/********************************************************************************
 * Copyright (c) 2021,2022 T-Systems International GmbH and BMW Group AG
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

/* eslint-disable react-hooks/exhaustive-deps */
import { DetailGrid } from 'components/shared/basic/DetailGrid'
import {
  Dialog,
  DialogHeader,
  DialogContent,
  Typography,
  theme,
  Input,
  Button,
  DialogActions,
} from 'cx-portal-shared-components'
import { semanticModelsSelector } from 'features/semanticModels/slice'
import { useDispatch, useSelector } from 'react-redux'
import { Divider, Box, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import DownloadLink from './DownloadLink'
import { useEffect, useState } from 'react'
import {
  changeOpenApiUrl,
  deleteSemanticModelById,
} from 'features/semanticModels/actions'
import UserService from 'services/UserService'
import { ROLES } from 'types/Constants'
import { getSemanticApiBase } from 'services/EnvironmentService'
import { getHeaders } from 'services/RequestService'

interface ModelDetailDialogProps {
  show: boolean
  onClose: () => void
}

const ModelDetailDialog = ({ show, onClose }: ModelDetailDialogProps) => {
  const { t } = useTranslation()
  const { model, loadingModel, openApiLink, error, openApiError } = useSelector(
    semanticModelsSelector
  )
  const dispatch = useDispatch()
  const [diagram, setDiagram] = useState<string>('')
  const [diagramError, setDiagramError] = useState<string>('')
  const [openApiUrlInput, setOpenApiUrlInput] = useState<string>('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false)
  const downloadItems = ['docu', 'json', 'payload', 'aas']
  const margin = { mr: -2, ml: -2 }

  useEffect(() => {
    setDiagram('')
    if (model) {
      fetch(
        `${getSemanticApiBase()}hub/api/v1/models/${encodeURIComponent(
          model.urn
        )}/diagram`,
        getHeaders()
      )
        .then((response) => {
          if (!response.ok) {
            setDiagramError(t('content.semantichub.detail.fileError'))
          } else {
            return response.blob()
          }
        })
        .then((result) => {
          if (result) {
            setDiagram(URL.createObjectURL(result))
          }
        })
    }
  }, [model])

  useEffect(() => {
    if (openApiLink.length > 0) window.open(openApiLink, '_blank')
  }, [openApiLink])

  const onOpenApiUrlChange = () => {
    if (model) {
      const encodedUrn = encodeURIComponent(model?.urn)
      dispatch(changeOpenApiUrl({ id: encodedUrn, url: openApiUrlInput }))
    }
  }

  const onDeleteConfirm = () => {
    setShowDeleteConfirm(false)
    if (model) {
      dispatch(
        deleteSemanticModelById({ id: model.urn, modelName: model.name })
      )
    }
  }

  const Loading = (
    <Box sx={{ textAlign: 'center' }}>
      <CircularProgress size={35} sx={{ color: theme.palette.primary.main }} />
    </Box>
  )

  return (
    <>
      <Dialog open={show}>
        <DialogHeader title="" closeWithIcon onCloseWithIcon={onClose} />
        <DialogContent>
          {model && (
            <>
              <Box sx={{ position: 'relative' }}>
                <Divider sx={margin} />
                <Typography
                  sx={{
                    typography: 'label2',
                    ...margin,
                    p: '18px 16px',
                    bgcolor: 'background.background09',
                  }}
                >
                  {model.name}
                </Typography>
                {UserService.hasRole(ROLES.SEMANTICHUB_DELETE) && (
                  <Button
                    size="small"
                    onClick={() => setShowDeleteConfirm(true)}
                    sx={{
                      position: 'absolute',
                      top: '10px',
                      right: 0,
                    }}
                  >
                    {t('content.semantichub.detail.deleteButton')}
                  </Button>
                )}
                <Divider sx={{ mb: 2, ...margin }} />
              </Box>
              <DetailGrid
                topic={t('content.semantichub.table.columns.version')}
                content={model.version}
              />
              <Divider sx={{ mb: 2, ...margin }} />
              <DetailGrid
                topic={t('content.semantichub.table.columns.status')}
                content={model.status}
              />
              <Divider sx={{ mb: 2, ...margin }} />
              <DetailGrid
                topic={t('content.semantichub.detail.urnLabel')}
                content={model.urn}
              />
              <Typography variant="h5" mb={4}>
                {t('content.semantichub.detail.diagramTitle')}
              </Typography>
              {diagram ? (
                <img
                  style={{ marginBottom: '32px' }}
                  width="100%"
                  src={diagram}
                  alt={t('content.semantichub.detail.imgAlt')}
                />
              ) : (
                Loading
              )}
              {diagramError.length > 0 && (
                <Typography color="error">
                  t('content.semantichub.detail.fileError')
                </Typography>
              )}
              <Typography variant="h5" mb={2}>
                {t('content.semantichub.detail.downloadTitle')}
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                mb={2}
              >
                <DownloadLink
                  type="ttl"
                  urn={model.urn}
                  title={t('content.semantichub.detail.ttlTooltip')}
                />
                {downloadItems.map((download) => (
                  <DownloadLink
                    key={`download_${download}`}
                    type={download}
                    urn={model.urn}
                  />
                ))}
              </Box>
              <Box display="flex" alignItems="flex-end">
                <Box sx={{ flexGrow: '1', mr: 2 }}>
                  <Input
                    label={t('content.semantichub.detail.openApi.inputLabel')}
                    placeholder={t(
                      'content.semantichub.detail.openApi.inputPlaceholder'
                    )}
                    onChange={(e) => setOpenApiUrlInput(e.target.value)}
                    value={openApiUrlInput}
                  />
                </Box>
                <Button
                  title={t('content.semantichub.detail.openApi.buttonTitle')}
                  onClick={onOpenApiUrlChange}
                >
                  {t('content.semantichub.detail.openApi.buttonText')}
                </Button>
              </Box>
              {openApiError && (
                <Typography sx={{ typography: 'body3', mt: 1 }} color="error">
                  {openApiError}
                </Typography>
              )}
            </>
          )}
          {loadingModel && Loading}
          {error && (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" mb={3}>
                {t('content.semantichub.detail.nomodelTitle')}
              </Typography>
              <Typography>
                {t('content.semantichub.detail.nomodelText')}
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={showDeleteConfirm}>
        <DialogContent sx={{ textAlign: 'center', pt: 7, pb: 7 }}>
          <Typography variant="h4" mb={3}>
            {t('content.semantichub.deleteDialog.title')}
          </Typography>
          <Typography variant="h5" mb={3}>
            {t('content.semantichub.deleteDialog.subtitle')}
          </Typography>
          <Typography sx={{ typography: 'body01' }}>
            {t('content.semantichub.deleteDialog.info')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteConfirm(false)}>
            {t('content.semantichub.deleteDialog.buttonCancel')}
          </Button>
          <Button onClick={onDeleteConfirm}>
            {t('content.semantichub.deleteDialog.buttonConfirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ModelDetailDialog
