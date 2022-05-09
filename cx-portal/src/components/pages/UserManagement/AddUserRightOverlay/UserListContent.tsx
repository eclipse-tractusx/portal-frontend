import { StatusTag, Table } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { userList } from '../AppUserDetails/components/AppUserDetailsTable'

export default function UserListContent() {
  const { t } = useTranslation()

  return (
    <Table
      title={t('content.usermanagement.table.title')}
      toolbar={{
        onSearch: () => {
          console.log('search user right function')
        },
        onFilter: () => {
          console.log('filter user right function')
        },
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
      ]}
      rows={userList}
      getRowId={(row: { [key: string]: string }) => row.id}
      hideFooter
    />
  )
}
