import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  Button,
  DialogActions,
  DialogHeader,
} from 'cx-portal-shared-components'

interface DeleteConfirmationOverlayProps {
  openDialog?: boolean
  handleOverlayClose: React.MouseEventHandler
  handleConfirmClick: React.MouseEventHandler
}

const DeleteConfirmationOverlay = ({
  openDialog = false,
  handleOverlayClose,
  handleConfirmClick,
}: DeleteConfirmationOverlayProps) => {
  const { t } = useTranslation()

  return (
    <div>
      <Dialog
        open={openDialog}
        sx={{
          '.MuiDialog-paper': {
            maxWidth: '45%',
          },
        }}
      >
        <DialogHeader title={t('content.edcconnector.deletemodal.title')} />
        <DialogContent>
          {t('content.edcconnector.deletemodal.description')}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={(e) => handleOverlayClose(e)}>
            {t('global.actions.cancel')}
          </Button>
          <Button variant="contained" onClick={(e) => handleConfirmClick(e)}>
            {t('global.actions.confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeleteConfirmationOverlay
