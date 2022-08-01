import {
  IconButton,
  StatusTag,
  Table,
  Button,
} from 'cx-portal-shared-components'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { fetchTenantUsers } from 'features/admin/user/actions'
import { tenantUsersSelector } from 'features/admin/user/slice'
import { TenantUser } from 'features/admin/user/types'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import './AppUserDetailsTable.scss'
import { useNavigate } from 'react-router-dom'

interface ActiveUserTableProps {
  onAddUserButtonClick?: () => void
}

export const AppUserDetailsTable = ({
  onAddUserButtonClick,
}: ActiveUserTableProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const tenantUsers = useSelector(tenantUsersSelector)
  const navigate = useNavigate()

  const onUserDetailsClick = (userId: string) => {
    navigate('/usermanagement/userdetails/' + userId)
  }

  useEffect(() => {
    dispatch(fetchTenantUsers())
  }, [dispatch])

  return (
    <>
      <section style={{ paddingTop: '100px' }}>
        <SubHeaderTitle
          title="content.usermanagement.appUserDetails.table.headline"
          variant="h3"
        />

        <Table
          title={t('content.usermanagement.appUserDetails.table.title')}
          toolbar={{
            onSearch: () => {
              console.log('search function')
            },
            buttonLabel: t('content.usermanagement.appUserDetails.table.add'),
            onButtonClick: onAddUserButtonClick,
          }}
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
          rows={tenantUsers}
          getRowId={(row: { [key: string]: string }) => row.companyUserId}
          disableColumnMenu
          hideFooter
        />
      </section>

      <div className="load-more-button-container">
        <Button
          size="medium"
          onClick={() => {
            console.log('load more')
          }}
        >
          {t('content.partnernetwork.loadmore')}
        </Button>
      </div>
    </>
  )
}
