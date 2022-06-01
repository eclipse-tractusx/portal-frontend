import {
  Dialog,
  DialogActions,
  DialogHeader,
  Button,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'

interface AddTechnicalUserOverlayProps {
  dialogOpen: boolean
  handleClose: React.MouseEventHandler
}

export const AddTechnicalUserOverlay = ({
  dialogOpen,
  handleClose,
}: AddTechnicalUserOverlayProps) => {
  const { t } = useTranslation()

  const handleConfirm = () => {
    console.log('add condifrm function!')
  }

  return (
    <div>
      <Dialog open={dialogOpen}>
        <DialogHeader
          title={t('content.addUser.headline')}
          intro={t('content.addUser.subheadline')}
        />

        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            {`${t('global.actions.cancel')}`}
          </Button>
          <Button variant="contained" onClick={handleConfirm}>
            {`${t('global.actions.confirm')}`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
