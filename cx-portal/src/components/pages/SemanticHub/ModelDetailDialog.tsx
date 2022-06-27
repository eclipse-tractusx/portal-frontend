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
  fetchModelArtefact,
} from 'features/semanticModels/actions'
import UserService from 'services/UserService'
import { ROLES } from 'types/MainTypes'

interface ModelDetailDialogProps {
  show: boolean
  onClose: () => void
}

const ModelDetailDialog = ({ show, onClose }: ModelDetailDialogProps) => {
  const { t } = useTranslation()
  const {
    model,
    loadingModel,
    diagram,
    ttlFile,
    jsonFile,
    docuFile,
    payloadFile,
    openApiLink,
    error,
    openApiError,
  } = useSelector(semanticModelsSelector)
  const dispatch = useDispatch()
  const [openApiUrlInput, setOpenApiUrlInput] = useState<string>('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false)
  const downloadItems = ['docu', 'json', 'payload']
  const margin = { mr: -2, ml: -2 }

  const getFile = (type: string) => {
    if (model) {
      const encodedUrn = encodeURIComponent(model.urn)
      dispatch(fetchModelArtefact({ type: type, id: encodedUrn }))
    }
  }

  const openFileInNewTab = (file: string) => {
    if(file.length > 0) window.open(file, '_blank');
  }

  useEffect(() => {
    openFileInNewTab(openApiLink)
  }, [openApiLink])

  useEffect(() => {
    openFileInNewTab(ttlFile)
  }, [ttlFile])

  useEffect(() => {
    openFileInNewTab(jsonFile)
  }, [jsonFile])

  useEffect(() => {
    openFileInNewTab(docuFile)
  }, [docuFile])

  useEffect(() => {
    openFileInNewTab(payloadFile)
  }, [payloadFile])

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
              {diagram && (
                <img
                  style={{ marginBottom: '32px' }}
                  width="100%"
                  src={diagram}
                  alt={t('content.semantichub.detail.imgAlt')}
                />
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
                  onClick={getFile}
                  title={t('content.semantichub.detail.ttlTooltip')}
                />
                {downloadItems.map((download) => (
                  <DownloadLink
                    key={`download_${download}`}
                    type={download}
                    onClick={getFile}
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
          {loadingModel && (
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress
                size={35}
                sx={{
                  color: theme.palette.primary.main,
                }}
              />
            </Box>
          )}
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
