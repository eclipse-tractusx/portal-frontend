import { PageLoadingTable, StatusTag } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import uniqueId from 'lodash/uniqueId'
import { TenantUser } from 'features/admin/user/types'
import { useFetchUsersQuery } from 'features/admin/user/apiSlice'

export default function UserListContent() {
  const { t } = useTranslation()
  return (
    <PageLoadingTable<TenantUser>
      title={t('content.usermanagement.table.title')}
      loadLabel={t('global.actions.loadmore')}
      fetch={useFetchUsersQuery}
      getRowId={(row: { [key: string]: string }) => uniqueId(row.companyUserId)}
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
      checkboxSelection
    />
  )
}
