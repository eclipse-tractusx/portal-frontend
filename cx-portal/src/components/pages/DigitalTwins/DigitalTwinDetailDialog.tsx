import {
  Dialog,
  DialogContent,
  DialogHeader,
  Typography,
} from 'cx-portal-shared-components'
import { useSelector } from 'react-redux'
import { twinsSelector } from 'features/digitalTwins/slice'
import { TwinDetails } from './TwinDetails'
import { Box, useTheme, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface TwinDialogProps {
  show: boolean
  onClose: () => void
}
const DigitalTwinDetailDialog = ({ show, onClose }: TwinDialogProps) => {
  const { twin, loading, error } = useSelector(twinsSelector)
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Dialog open={show}>
      <DialogHeader title="" closeWithIcon onCloseWithIcon={onClose} />
      <DialogContent>
        {twin && <TwinDetails twin={twin} />}
        {loading && (
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
          <>
            <Typography variant="h5" sx={{mb: 4, }}>
              {t('content.digitaltwin.detail.error')}
            </Typography>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DigitalTwinDetailDialog
