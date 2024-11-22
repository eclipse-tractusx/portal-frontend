import { StatusTag, Tooltips } from '@catena-x/portal-shared-components'
import { useOverlappingContent } from 'hooks/useOverlappingContent'
import { useMemo } from 'react'

interface RoleType {
  roleId: string
  clientId: string
  roleName: string
}
export const OverLappingStatusTag = ({ roles }: { roles: RoleType[] }) => {
  const { containerRef, visibleRoles, remainingCount } = useOverlappingContent({
    roles,
  })

  const tooltipText = useMemo(() => {
    const tooltipRoles = roles.slice(visibleRoles.length, roles.length)
    return tooltipRoles
      .map((role) => (typeof role === 'string' ? role : role.roleName))
      .join(', ')
  }, [visibleRoles, roles])

  return (
    <div ref={containerRef} className="user-management-roles-tag">
      <div className="reference-container">
        {roles.map((role, index) => (
          <StatusTag
            key={typeof role === 'string' ? role + index : role.roleId}
            label={typeof role === 'string' ? role : role.roleName}
            className="reference-role-tag"
          />
        ))}
      </div>
      {visibleRoles.map((role, index) => (
        <StatusTag
          color="label"
          key={typeof role === 'string' ? role + index : role.roleId}
          label={typeof role === 'string' ? role : role.roleName}
          className="statusTag"
        />
      ))}
      {remainingCount > 0 && (
        <Tooltips
          tooltipText={tooltipText}
          tooltipPlacement="top"
          color="dark"
          additionalStyles={{
            cursor: 'pointer !important',
          }}
        >
          <span className="statusTag status-more">{`+${remainingCount}`}</span>
        </Tooltips>
      )}
    </div>
  )
}
