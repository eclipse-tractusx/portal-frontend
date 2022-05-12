import {
  IconButton,
  StatusTag,
  Table,
  Button,
} from 'cx-portal-shared-components'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { fetchTenantUsers } from 'state/features/adminUser/actions'
import { TenantUser } from 'state/features/adminUser/types'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import './AppUserDetailsTable.scss'

interface ActiveUserTableProps {
  onAddUserButtonClick?: () => void
}

export const userList = [
  {
    id: '1',
    name: 'Admin Name',
    email: 'admin@mail.com',
    enabled: true,
    role: 'Admin',
    details: '',
  },
  {
    id: '2',
    name: 'User Name',
    email: 'user@mail.com',
    enabled: false,
    role: 'User',
    details: '',
  },
]

export const AppUserDetailsTable = ({
  onAddUserButtonClick,
}: ActiveUserTableProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

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
                  onClick={() => onUserDetailsClick(row.userId)}
                >
                  <ArrowForwardIcon />
                </IconButton>
              ),
            },
          ]}
          rows={userList}
          getRowId={(row: { [key: string]: string }) => row.id}
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
