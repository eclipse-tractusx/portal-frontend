import { IconButton, Table } from 'cx-portal-shared-components'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { fetchTenantUsers } from 'features/admin/user/actions'
import { TechnicalUser } from 'features/admin/user/types'
import { useNavigate } from 'react-router-dom'

const technicalUsers = [
  {
    userEntityId: '1',
    userName: 'userName1',
    clientId: 'clientId1',
    authType: 'authType',
  },
  {
    userEntityId: '2',
    userName: 'userName2',
    clientId: 'clientId2',
    authType: 'authType2',
  },
  {
    userEntityId: '3',
    userName: 'userName3',
    clientId: 'clientId3',
    authType: 'authType3',
  },
]

export const TechnicalUserTable = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onUserDetailsClick = (userId: string, username: string) => {
    navigate('/usermanagement/technicaluser/userdetails/' + userId, {
      state: { username: username },
    })
  }

  useEffect(() => {
    dispatch(fetchTenantUsers())
  }, [dispatch])

  return (
    <div style={{ paddingTop: '100px' }}>
      <Table
        title={t('content.usermanagement.technicalUser.tableHeader')}
        toolbar={{
          onSearch: () => {
            console.log('search function')
          },
        }}
        columns={[
          {
            field: 'userName',
            headerName: t('global.field.userName'),
            flex: 2,
          },
          {
            field: 'clientId',
            headerName: t('global.field.clientId'),
            flex: 1,
          },
          {
            field: 'authType',
            headerName: t('global.field.authType'),
            flex: 1,
          },
          {
            field: 'details',
            headerName: t('global.field.details'),
            flex: 1,
            renderCell: ({ row }: { row: TechnicalUser }) => (
              <IconButton
                color="secondary"
                onClick={() =>
                  onUserDetailsClick(row.userEntityId, row.userName)
                }
              >
                <ArrowForwardIcon />
              </IconButton>
            ),
          },
        ]}
        rows={technicalUsers}
        getRowId={(row: { [key: string]: string }) => row.userEntityId}
        hideFooter
      />
    </div>
  )
}
