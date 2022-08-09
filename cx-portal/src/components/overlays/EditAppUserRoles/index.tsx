import {
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogHeader,
} from 'cx-portal-shared-components'
import { useFetchAppRolesQuery } from 'features/admin/appuserApiSlice'
import { useFetchUserDetailsQuery } from 'features/admin/userApiSlice'
import { useFetchAppDetailsQuery } from 'features/apps/apiSlice'
import { show } from 'features/control/overlay/actions'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { OVERLAYS } from 'types/Constants'
import './style.scss'

export default function EditAppUserRoles({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { appId } = useParams()
  const [roles, setRoles] = useState<string[]>([])
  const appDetails = useFetchAppDetailsQuery(appId ?? '').data
  const appRoles = useFetchAppRolesQuery(appId ?? '').data
  const { data } = useFetchUserDetailsQuery(id)
  const assignedRoles = data && data.assignedRoles[0].roles

  const selectRole = (roleId: string, select: boolean) => {
    const isSelected = roles.includes(roleId)
    if (!isSelected && select) {
      dispatch(setRoles([...roles, roleId]))
    } else if (isSelected && !select) {
      const oldRoles = [...roles]
      oldRoles.splice(oldRoles.indexOf(roleId), 1)
      dispatch(setRoles([...oldRoles]))
    }
  }

  return (
    <>
      <div className="roles-heading">
        <DialogHeader
          {...{
            title:
              t('content.usermanagement.appUserDetails.editRoles.title') +
              appDetails?.title,
            intro: t(
              'content.usermanagement.appUserDetails.editRoles.subtitle'
            ),
            closeWithIcon: true,
            onCloseWithIcon: () => dispatch(show(OVERLAYS.NONE, '')),
          }}
        />
      </div>
      <DialogContent>
        <div className="roles-list">
          <ul>
            {appRoles &&
              appRoles.map((role) => (
                <li key={role.roleId}>
                  <Checkbox
                    label={role.role}
                    checked={assignedRoles?.indexOf(role.role) !== -1}
                    onChange={(e) => selectRole(role.roleId, e.target.checked)}
                  />
                </li>
              ))}
          </ul>
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
