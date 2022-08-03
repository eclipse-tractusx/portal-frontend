import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox } from 'cx-portal-shared-components'
import { Box } from '@mui/material'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import { setUserRolesToAdd } from 'features/admin/user/actions'
import { useParams } from 'react-router-dom'
import { fetchRoles } from 'features/admin/approle/actions'
import { roleSelector } from 'features/admin/approle/slice'

interface UserRolesProps {
  headline?: string
}

export const UserRoles = ({ headline }: UserRolesProps) => {
  const { t } = useTranslation()
  let [roles, setRoles] = useState<string[]>([])
  const userRoles = useSelector(roleSelector)
  const appId = useParams().appId
  const dispatch = useDispatch()

  useEffect(() => {
    if (appId) {
      dispatch(fetchRoles(appId))
    }
  }, [dispatch, appId])

  useEffect(() => {
    dispatch(setUserRolesToAdd(roles))
  }, [roles, dispatch])

  const onInputChange = ({ e, role }: { e: any; role: string }) => {
    if (!roles.includes(role) && e.target.checked) {
      setRoles([...roles, role])
    } else {
      const oldRoles = [...roles]
      oldRoles.splice(oldRoles.indexOf(role), 1)
      setRoles([...oldRoles])
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
      {headline && (
        <div className="add-user-title">
          <SubHeaderTitle title={headline} variant="body1" />
        </div>
      )}

      <div className="checkbox-section">
        {userRoles.map(({ roleId, role }) => (
          <Checkbox
            label={role}
            key={roleId}
            onChange={(e) => onInputChange({ e, role })}
          />
        ))}
      </div>
    </Box>
  )
}
