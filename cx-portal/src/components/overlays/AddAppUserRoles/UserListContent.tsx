import { PageLoadingTable, StatusTag } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import uniqueId from 'lodash/uniqueId'
import { TenantUser, useFetchUsersQuery } from 'features/admin/userApiSlice'

export default function UserListContent() {
  const { t } = useTranslation()
  return (
    <PageLoadingTable<TenantUser>
      title={t('content.usermanagement.table.title')}
      loadLabel={t('global.actions.loadmore')}
      fetchHook={useFetchUsersQuery}
      getRowId={(row: { [key: string]: string }) => uniqueId(row.companyUserId)}
      columns={[
        {
          field: 'name',
          headerName: t('global.field.name'),
          flex: 4,
          valueGetter: ({ row }: { row: TenantUser }) =>
            `${row.firstName} ${row.lastName}`,
        },
        { field: 'email', headerName: t('global.field.email'), flex: 5 },
        {
          field: 'enabled',
          headerName: t('global.field.status'),
          flex: 2,
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
