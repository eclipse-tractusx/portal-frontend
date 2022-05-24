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
import { fetchTenantUsers } from 'state/features/adminUser/actions'
import { tenantUsersSelector } from 'state/features/adminUser/slice'
import { TenantUser } from 'state/features/adminUser/types'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import './AppUserDetailsTable.scss'

interface ActiveUserTableProps {
  onAddUserButtonClick?: () => void
}

export const AppUserDetailsTable = ({
  onAddUserButtonClick,
}: ActiveUserTableProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const tenantUsers = useSelector(tenantUsersSelector)

  const onUserDetailsClick = (userId: string) => {
    console.log('show details', userId)
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
            { field: 'name', headerName: t('global.field.name'), flex: 2 },
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
              headerName: t('global.field.details'),
              flex: 1,
              renderCell: ({ row }: { row: TenantUser }) => (
                <IconButton
                  color="secondary"
                  onClick={() => onUserDetailsClick(row.userEntityId)}
                >
                  <ArrowForwardIcon />
                </IconButton>
              ),
            },
          ]}
          rows={tenantUsers}
          getRowId={(row: { [key: string]: string }) => row.userEntityId}
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
