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
import { useEffect, useState } from 'react'
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
  const assignedRoles = data && data.assignedRoles.filter(assignedRole => assignedRole.appId === appId)[0].roles

  useEffect(()=> {
    setRoles(assignedRoles!)
  }, [assignedRoles])

  useEffect(()=> {
    console.log('assignedRoles', assignedRoles)
    console.log('roles', roles)
  }, [roles])

  const selectRole = (role: string, select: boolean) => {
    const isSelected = roles.includes(role)
    console.log('isSelected', isSelected)
    console.log('role', role)
    console.log('select', select)
    if (!isSelected && select) {
      setRoles([...roles, role])
    } else if (isSelected && !select) {
      const oldRoles = [...roles]
      oldRoles.splice(oldRoles.indexOf(role), 1)
      setRoles([...oldRoles])
    }
  }

  const saveRoles = () => {
    console.log('^^^^^')
  }

  const checkConfirmBtn = () => {
    return assignedRoles && roles && assignedRoles.length === roles.length && assignedRoles.every(function(value, index) { return value === roles[index]})
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
            {appRoles && roles && 
              appRoles.map((role) => (
                <li key={role.roleId}>
                  <Checkbox
                    label={role.role}
                    checked={roles.indexOf(role.role) !== -1}
                    onChange={(e) => selectRole(role.role, e.target.checked)}
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
        <Button variant="contained" onClick={saveRoles} disabled={checkConfirmBtn()}>
          {t('global.actions.confirm')}
        </Button>
      </DialogActions>
    </>
  )
}
