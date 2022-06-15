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
import { Divider, Box, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import DownloadIcon from '@mui/icons-material/Download'
import { useEffect } from 'react'

interface ModelDetailDialogProps {
  show: boolean
  onClose: () => void
}

const ModelDetailDialog = ({ show, onClose }: ModelDetailDialogProps) => {
  const { t } = useTranslation()
  const { model, loadingModel, diagram, error } = useSelector(
    semanticModelsSelector
  )
  const downloadItems = ['ttl', 'docu', 'json', 'payload']
  const margin = { mr: -2, ml: -2 }
  useEffect(() => {
    console.log(diagram)
  }, [diagram])
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
            {downloadItems.map((download) => (
              <Box key={`download_${download}`} sx={{ display: 'flex', mb: 2 }}>
                <DownloadIcon sx={{ mr: '20px', alignItems: 'center' }} />
                <Typography>
                  {t(`content.semantichub.detail.downloads.${download}`)}
                </Typography>
              </Box>
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
      </DialogContent>
    </Dialog>
  )
}

export default ModelDetailDialog
