import {
  DialogActions,
  DialogContent,
  DialogHeader,
  Button,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { AppRoles } from './AppRoles'
import UserListContent from './UserListContent'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'
import './AddAppUserRoles.scss'

export default function AddAppUserRoles() {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  return (
    <>
      <DialogHeader
        title={t('content.addUserRight.headline')}
        intro={t('content.addUserRight.subheadline')}
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(show(OVERLAYS.NONE, ''))}
      />

      <DialogContent className="add-user-overlay-content">
        <div className="add-user-overlay-content-roles">
          <AppRoles />
        </div>

        <div className="add-user-overlay-content-content">
          <UserListContent />
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => dispatch(show(OVERLAYS.NONE))}
        >
          {t('global.actions.cancel')}
        </Button>
        <Button variant="contained" onClick={() => console.log('confirm')}>
          {t('global.actions.confirm')}
        </Button>
      </DialogActions>
    </>
  )
}
