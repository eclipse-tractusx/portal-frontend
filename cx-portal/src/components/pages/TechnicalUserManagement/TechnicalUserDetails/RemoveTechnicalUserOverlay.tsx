import {
  Dialog,
  DialogActions,
  DialogHeader,
  DialogContent,
  Button,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'

interface RemoveTechnicalUserOverlayProps {
  name: string
  dialogOpen: boolean
  handleClose: React.MouseEventHandler
  deleteUser: React.MouseEventHandler
}

export const RemoveTechnicalUserOverlay = ({
  name,
  dialogOpen,
  handleClose,
  deleteUser,
}: RemoveTechnicalUserOverlayProps) => {
  const { t } = useTranslation()

  const confirmDeleteUserText = () => {
    const text = t('content.usermanagement.technicalUser.confirmDeleteUser')
    return text.replace('OBJECT_NAME', name)
  }

  const noteDeleteUserText = () => {
    const text = t('content.usermanagement.technicalUser.noteDeleteUser')
    return text.replace('OBJECT_NAME', name)
  }

  return (
    <Dialog open={dialogOpen}>
      <DialogHeader
        title={t('global.actions.delete') + ' ' + name}
      />
      
      <DialogContent>
        <div className="remove-technical-user-content">
          <SubHeaderTitle
            title={confirmDeleteUserText()}
            variant="h6"
          />
          <SubHeaderTitle
            title={noteDeleteUserText()}
            variant="h5"
          />
        </div>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          {`${t('global.actions.cancel')}`}
        </Button>
        <Button variant="contained" onClick={deleteUser}>
          {`${t('global.actions.delete')}`}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
