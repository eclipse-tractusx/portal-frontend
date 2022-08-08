import { Checkbox } from 'cx-portal-shared-components'
import { Box } from '@mui/material'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { rolesToAddSelector } from 'features/admin/userDeprecated/slice'
import { setRolesToAdd } from 'features/admin/userDeprecated/actions'
import { useFetchAppRolesQuery } from 'features/admin/appuserApiSlice'
import { useParams } from 'react-router-dom'

export const AppRoles = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const roles = useSelector(rolesToAddSelector)
  const { appId } = useParams()
  const { data } = useFetchAppRolesQuery(appId!)

  const selectRole = (roleId: string, select: boolean) => {
    const isSelected = roles.includes(roleId)
    if (!isSelected && select) {
      dispatch(setRolesToAdd([...roles, roleId]))
    } else if (isSelected && !select) {
      const oldRoles = [...roles]
      oldRoles.splice(oldRoles.indexOf(roleId), 1)
      dispatch(setRolesToAdd([...oldRoles]))
    }
  }

  return (
    <Box
      sx={{
        '.checkbox-section': {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        label: {
          fontSize: '16px',
        },
      }}
    >
      <div className="add-user-title">
        <SubHeaderTitle
          title={t('content.addUser.chooseUserRole')}
          variant="body1"
        />
      </div>

      <div className="checkbox-section">
        {data &&
          data.map((role) => (
            <Checkbox
              label={role.role}
              key={role.roleId}
              onChange={(e) => selectRole(role.roleId, e.target.checked)}
            />
          ))}
      </div>
    </Box>
  )
}
