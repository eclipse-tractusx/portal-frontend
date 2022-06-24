import { DetailGrid } from 'components/shared/basic/DetailGrid'
import {
  Dialog,
  DialogHeader,
  DialogContent,
  Typography,
  theme,
  Input,
  Button,
} from 'cx-portal-shared-components'
import { semanticModelsSelector } from 'features/semanticModels/slice'
import { useDispatch, useSelector } from 'react-redux'
import { Divider, Box, CircularProgress, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import DownloadLink from './DownloadLink'
import { useEffect, useState } from 'react'
import {
  changeOpenApiUrl,
  deleteSemanticModelById,
} from 'features/semanticModels/actions'

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
  const downloadItems = ['docu', 'json', 'payload']
  const margin = { mr: -2, ml: -2 }

  const getFile = (type: string) => {
    switch (type) {
      case 'diagram': {
        return diagram
      }
      case 'ttl': {
        return ttlFile
      }
      case 'json': {
        return jsonFile
      }
      case 'payload': {
        return payloadFile
      }
      case 'docu': {
        return docuFile
      }
    }
  }

  useEffect(() => {
    if (openApiLink.length > 0) window.open(openApiLink, '_blank')
  }, [openApiLink])

  const onOpenApiUrlChange = () => {
    if (model) {
      const encodedUrn = encodeURIComponent(model?.urn)
      dispatch(changeOpenApiUrl({ id: encodedUrn, url: openApiUrlInput }))
    }
  }

  const onDeleteModel = () => {
    if (model) {
      dispatch(
        deleteSemanticModelById({ id: model.urn, modelName: model.name })
      )
    }
  }

  return (
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
                {t('content.semantichub.detail.title')}
              </Typography>
              <Button
                size="small"
                onClick={onDeleteModel}
                sx={{
                  position: 'absolute',
                  top: '10px',
                  right: 0,
                }}
              >
                Delete Model
              </Button>
              <Divider sx={{ mb: 2, ...margin }} />
            </Box>
            <DetailGrid topic="Version" content={model.version} />
            <Divider sx={{ mb: 2, ...margin }} />
            <DetailGrid topic="Status" content={model.status} />
            <Divider sx={{ mb: 2, ...margin }} />
            <DetailGrid topic="URN" content={model.urn} />
            <Typography variant="h5" mb={4}>
              {t('content.semantichub.detail.diagramTitle')}
            </Typography>
            {diagram && (
              <img
                style={{ marginBottom: '32px' }}
                width="100%"
                src={diagram}
                alt="Model diagram"
              />
            )}
            <Typography variant="h5" mb={4}>
              {t('content.semantichub.detail.downloadTitle')}
            </Typography>
            <Tooltip title="Add" arrow placement="bottom-start">
              <DownloadLink type="ttl" href={getFile('ttl')} />
            </Tooltip>
            {downloadItems.map((download) => (
              <DownloadLink
                key={`download_${download}`}
                type={download}
                href={getFile(download)}
              />
            ))}
            <Box display="flex" alignItems="flex-end">
              <Box sx={{ flexGrow: '1', mr: 2 }}>
                <Input
                  label={'Enter a base URL to change the default open API URL'}
                  placeholder={'Default URL'}
                  onChange={(e) => setOpenApiUrlInput(e.target.value)}
                  value={openApiUrlInput}
                />
              </Box>
              <Button title="Get Open API JSON" onClick={onOpenApiUrlChange}>
                Save new URL
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
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
    </Dialog>
  )
}

export default ModelDetailDialog
