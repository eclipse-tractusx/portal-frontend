import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import {
  IconButton,
  StatusTag,
  PageLoadingTable,
  Button,
} from 'cx-portal-shared-components'
import { TenantUser, useFetchUsersQuery } from 'features/admin/userApiSlice'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'

export const ActiveUserTable = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onUserDetailsClick = (userId: string) => {
    navigate('/usermanagement/userdetails/' + userId)
  }

  return (
    <section id="identity-management-id">
      <SubHeaderTitle
        title="content.usermanagement.table.headline"
        variant="h3"
      />
      <Button
        onClick={() => dispatch(show(OVERLAYS.ADD_USER))}
        size="medium"
        sx={{ margin: '0 auto 25px auto', display: 'block' }}
      >
        {t('content.usermanagement.table.add')}
      </Button>
      <PageLoadingTable<TenantUser>
        title={t('content.usermanagement.table.title')}
        loadLabel={t('global.actions.more')}
        fetch={useFetchUsersQuery}
        getRowId={(row: { [key: string]: string }) => row.companyUserId}
        columns={[
          {
            field: 'firstName',
            headerName: t('global.field.name'),
            flex: 3,
            valueGetter: ({ row }: { row: TenantUser }) =>
              `${row.firstName} ${row.lastName}`,
          },
          { field: 'email', headerName: t('global.field.email'), flex: 3 },
          {
            field: 'status',
            headerName: t('global.field.status'),
            flex: 2,
            renderCell: ({ value: status }) => {
              const label = status ? 'active' : 'inactive'
              return (
                <StatusTag color="label" label={t(`global.field.${label}`)} />
              )
            },
          },
          {
            field: 'roles',
            headerName: t('global.field.role'),
            flex: 4,
            renderCell: ({ value: roles }) => {
              return roles.length
                ? roles.map((role: string) => (
                    <StatusTag
                      key={role}
                      color="label"
                      label={role}
                      className="statusTag"
                    />
                  ))
                : ''
            },
          },
          {
            field: 'details',
            headerName: t('global.field.details'),
            flex: 2,
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
      />
    </section>
  )
}
