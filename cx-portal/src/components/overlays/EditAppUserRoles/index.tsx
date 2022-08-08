import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
} from 'cx-portal-shared-components'
import { useFetchAppRolesQuery } from 'features/admin/appuserApiSlice'
import { useFetchUserDetailsQuery } from 'features/admin/userApiSlice'
import { useFetchAppDetailsQuery } from 'features/apps/apiSlice'
import { show } from 'features/control/overlay/actions'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { OVERLAYS } from 'types/Constants'
import './style.scss'

export default function EditAppUserRoles({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { appId } = useParams()
  const appDetails = useFetchAppDetailsQuery(appId ?? '').data
  const appRoles = useFetchAppRolesQuery(appId ?? '').data
  const { data } = useFetchUserDetailsQuery(id)

  return (
    <>
      <div className="roles-heading">
        <DialogHeader
          {...{
            title: 'Manage roles for ' + appDetails?.title,
            intro: 'Dynamic App Id',
            closeWithIcon: true,
            onCloseWithIcon: () => dispatch(show(OVERLAYS.NONE, '')),
          }}
        />
      </div>
      <DialogContent>
        <pre>roles: {JSON.stringify(appRoles, null, 2)}</pre>
        <pre>user: {JSON.stringify(data, null, 2)}</pre>
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
