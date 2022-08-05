import { useState } from 'react'
import { Checkbox } from 'cx-portal-shared-components'
import { Box } from '@mui/material'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import { useFetchUserRolesQuery } from 'features/admin/userApiSlice'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { rolesToAddSelector } from 'features/admin/userDeprecated/slice'
import { setRolesToAdd } from 'features/admin/userDeprecated/actions'

export const UserRoles = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const roles = useSelector(rolesToAddSelector)
  const { data } = useFetchUserRolesQuery()

  const selectRole = (role: string, select: boolean) => {
    const isSelected = roles.includes(role)
    if (!isSelected && select) {
      dispatch(setRolesToAdd([...roles, role]))
    } else if (isSelected && !select) {
      const oldRoles = [...roles]
      oldRoles.splice(oldRoles.indexOf(role), 1)
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
              checked={Array.isArray(roles) && roles.includes(role)}
              label={role}
              key={role}
              onChange={(e) => selectRole(role, e.target.checked)}
            />
          ))}
      </div>
    </Box>
  )
}
