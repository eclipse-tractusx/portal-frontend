import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import { IconButton, StatusTag, Table } from 'cx-portal-shared-components'
import { fetchTenantUsers } from 'features/admin/user/actions'
import { tenantUsersSelector } from 'features/admin/user/slice'
import { TenantUser } from 'features/admin/user/types'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface ActiveUserTableProps {
  onAddUserButtonClick?: () => void
}

export const ActiveUserTable = ({
  onAddUserButtonClick,
}: ActiveUserTableProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const tenantUsers = useSelector(tenantUsersSelector)

  const onUserDetailsClick = (userId: string) => {
    navigate('/usermanagement/userdetails/' + userId)
  }

  useEffect(() => {
    dispatch(fetchTenantUsers())
  }, [dispatch])

  return (
    <section id="identity-management-id">
      <SubHeaderTitle
        title="content.usermanagement.table.headline"
        variant="h3"
      />
      <Table
        columns={[
          { field: 'lastName', headerName: t('global.field.last'), flex: 1 },
          { field: 'firstName', headerName: t('global.field.first'), flex: 1 },
          { field: 'email', headerName: t('global.field.email'), flex: 2 },
          {
            field: 'enabled',
            headerName: t('global.field.status'),
            flex: 1,
            renderCell: ({ value: enabled }) => {
              const label = enabled ? 'active' : 'inactive'
              return (
                <StatusTag color="label" label={t(`global.field.${label}`)} />
              )
            },
          },
          { field: 'role', headerName: t('global.field.role'), flex: 1 },
          {
            field: 'details',
            headerName: t('content.usermanagement.table.details'),
            flex: 1,
            renderCell: ({ row }: { row: TenantUser }) => (
              <IconButton
                color="secondary"
                onClick={() => onUserDetailsClick(row.companyUserId)}
              >
                <ArrowForwardIcon />
              </IconButton>
            ),
          },
        ]}
        getRowId={(row: { [key: string]: string }) => row.companyUserId}
        headerHeight={57}
        disableColumnMenu
        hideFooter
        rowHeight={57}
        rows={tenantUsers}
        title={t('content.usermanagement.table.title')}
        toolbar={{
          buttonLabel: t('content.usermanagement.table.add'),
          onButtonClick: onAddUserButtonClick,
        }}
      />
    </section>
  )
}
