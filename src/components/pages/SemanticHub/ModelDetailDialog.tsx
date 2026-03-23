/********************************************************************************
 * Copyright (c) 2023 T-Systems International GmbH and BMW Group AG
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
  CircleProgress,
} from '@arena2036/portal-shared-components-construct-x'
import { semanticModelsSelector } from 'features/semanticModels/slice'
import { useSelector } from 'react-redux'
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Divider,
  Box,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import DownloadLink from './DownloadLink'
import { useEffect, useState } from 'react'
import { Status } from 'features/semanticModels/types'
import { userHasSemanticHubRole } from 'services/AccessService'
import { ROLES } from 'types/Constants'
import {
  useChangeOpenApiUrlMutation,
  useDeleteModelByIdMutation,
} from 'features/semanticModels/apiSlice'
import { getSemanticApiBase } from 'services/EnvironmentService'
import { getHeaders } from 'services/RequestService'

interface ModelDetailDialogProps {
  show: boolean
  onClose: () => void
}

const ModelDetailDialog = ({ show, onClose }: ModelDetailDialogProps) => {
  const aasFileTypes = ['Aasx', 'Xml']
  const { t } = useTranslation()
  const { model, loadingModel, openApiLink, error, openApiError } = useSelector(
    semanticModelsSelector
  )
  const [diagram, setDiagram] = useState<string>('')
  const [diagramError, setDiagramError] = useState<string>('')
  const [openApiUrlInput, setOpenApiUrlInput] = useState<string>('')
  const [showDeleteBtn, setShowDeleteBtn] = useState<boolean>(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false)
  const [aasFormat, setAasFormat] = useState<string>(aasFileTypes[0])
  const downloadItems = [
    { type: 'docu' },
    { type: 'json', fileFormat: 'schema.json' },
    { type: 'payload', fileFormat: 'payload.json' },
  ]
  const margin = { mr: -2, ml: -2 }

  const [changeOpenApiUrl] = useChangeOpenApiUrlMutation()
  const [deleteModelById] = useDeleteModelByIdMutation()

  useEffect(() => {
    setDiagram('')
    if (model) {
      fetch(
        `${getSemanticApiBase()}/hub/api/v1/models/${encodeURIComponent(
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
            const reader = new FileReader()
            reader.onload = function () {
              const svgString = reader.result as string
              if (svgString) {
                setDiagram(svgString)
              } else {
                setDiagramError('content.semantichub.detail.fileError')
              }
            }
            reader.readAsText(result)
          }
        })
        .catch((err) => {
          console.log(err)
        })
      setShowDeleteBtn(
        userHasSemanticHubRole(ROLES.SEMANTICHUB_DELETE) &&
          model.status === Status.Draft
      )
    }
  }, [model])

  useEffect(() => {
    if (openApiLink.length > 0) window.open(openApiLink, '_blank')
  }, [openApiLink])

  const onOpenApiUrlChange = () => {
    if (model) {
      const encodedUrn = encodeURIComponent(model?.urn)
      changeOpenApiUrl({ id: encodedUrn, url: openApiUrlInput })
    }
  }

  const onDeleteConfirm = () => {
    setShowDeleteConfirm(false)
    if (model) {
      deleteModelById({ id: model.urn, modelName: model.name })
    }
  }

  const Loading = (
    <Box sx={{ textAlign: 'center' }}>
      <CircleProgress
        variant="indeterminate"
        colorVariant="primary"
        size={35}
        sx={{ color: theme.palette.primary.main }}
      />
    </Box>
  )

  return (
    <>
      <Dialog open={show}>
        <DialogHeader title=" " closeWithIcon onCloseWithIcon={onClose} />
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
                {showDeleteBtn && (
                  <Button
                    size="small"
                    onClick={() => {
                      setShowDeleteConfirm(true)
                    }}
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
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(diagram)}`}
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
                  fileName={`${model.name}.ttl`}
                />
                {downloadItems.map((download) => (
                  <DownloadLink
                    key={`download_${download.type}`}
                    type={download.type}
                    urn={model.urn}
                    fileName={
                      download.fileFormat
                        ? `${model.name}-${download.fileFormat}`
                        : ''
                    }
                  />
                ))}
                <Box display="flex" mt={2}>
                  <FormControl variant="outlined" sx={{ mr: 2 }}>
                    <InputLabel id="table-select-label">
                      {t('content.semantichub.detail.aasSelect.label')}
                    </InputLabel>
                    <Select
                      labelId="table-select-label"
                      id="table-select"
                      value={aasFormat}
                      label={t('content.semantichub.detail.aasSelect.label')}
                      onChange={(e) => {
                        setAasFormat(e.target.value)
                      }}
                      variant="filled"
                      defaultValue={aasFileTypes[0]}
                      sx={{ minWidth: '200px' }}
                    >
                      <MenuItem value={aasFileTypes[0]}>
                        {t('content.semantichub.detail.aasSelect.itemFile')}
                      </MenuItem>
                      <MenuItem value={aasFileTypes[1]}>
                        {t('content.semantichub.detail.aasSelect.itemXml')}
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <DownloadLink
                    type={`aas${aasFormat}`}
                    urn={model.urn}
                    fileName={`${model.name}.${aasFormat.toLowerCase()}`}
                  />
                </Box>
              </Box>
              <Box display="flex" alignItems="flex-end">
                <Box sx={{ flexGrow: '1', mr: 2 }}>
                  <Input
                    label={t('content.semantichub.detail.openApi.inputLabel')}
                    placeholder={t(
                      'content.semantichub.detail.openApi.inputPlaceholder'
                    )}
                    onChange={(e) => {
                      setOpenApiUrlInput(e.target.value)
                    }}
                    value={openApiUrlInput}
                  />
                </Box>
                <Button
                  size="small"
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
          <Button
            onClick={() => {
              setShowDeleteConfirm(false)
            }}
          >
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
