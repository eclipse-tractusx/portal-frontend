import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  Button,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { UserRoles } from '../AddUserOverlay/UserRoles'
import UserListContent from './UserListContent'
import './AddUserOverlay.scss'

export interface AddUserRightOverlayProps {
  openDialog?: boolean
  handleClose: React.MouseEventHandler
  handleConfirm: React.MouseEventHandler
}

export default function AddUserRightOverlay({
  openDialog = false,
  handleClose,
  handleConfirm,
}: AddUserRightOverlayProps) {
  const { t } = useTranslation()

  return (
    <div>
      <Dialog open={openDialog}>
        <DialogHeader
          title={t('content.addUserRight.headline')}
          intro={t('content.addUserRight.subheadline')}
        />

        <DialogContent className="add-user-overlay-content">
          <div className="add-user-overlay-content-roles">
            <UserRoles />
          </div>

          <div className="add-user-overlay-content-content">
            <UserListContent />
          </div>
        </DialogContent>

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
