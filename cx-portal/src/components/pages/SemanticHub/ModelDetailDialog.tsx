import { DetailGrid } from 'components/shared/basic/DetailGrid'
import {
  Dialog,
  DialogHeader,
  DialogContent,
  Typography,
  theme,
} from 'cx-portal-shared-components'
import { semanticModelsSelector } from 'features/semanticModels/slice'
import { useSelector } from 'react-redux'
import { Divider, Box, CircularProgress, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import DownloadLink from './DownloadLink'

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
    error,
  } = useSelector(semanticModelsSelector)
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

  return (
    <Dialog open={show}>
      <DialogHeader title="" closeWithIcon onCloseWithIcon={onClose} />
      <DialogContent>
        {model && (
          <>
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
            <Divider sx={{ mb: 2, ...margin }} />
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
              <DownloadLink type={download} href={getFile(download)} />
            ))}
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
