import './UserDetails.scss'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined'
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'
import SubHeader from '../../../shared/frame/SubHeader'
import { Box } from '@mui/material'
import {
  Button,
  UserDetails as UserDetailsComponent,
  UserAvatar,
  Typography,
  Table,
  Chip,
} from 'cx-portal-shared-components'
import { RootState } from 'state/store'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { GridRowModel } from '@mui/x-data-grid/models/gridRows'
import uniqueId from 'lodash/uniqueId'

export default function UserDetails() {
  const { t } = useTranslation()

  // TODO: Wrong user mock data
  const parsedUser = useSelector((state: RootState) => state.user)

  const userDetails = [
    {
      cardCategory: 'Personal Information',
      cardContentItems: {
        name: { label: 'Name', value: 'Max' },
        surname: { label: 'Nachname', value: 'Mustermann' },
        email: { label: 'E-Mail', value: 'm.musterman@test.de' },
        bpn: { label: 'BPN', value: '1234567' },
      },
    },
    {
      cardCategory: 'Status Information',
      cardContentItems: {
        status: { label: 'Status', value: 'Aktiv' },
        userCreated: { label: 'Nutzer angelegt', value: '17.02.1989' },
      },
    },
  ]

  const userAppRoles = [
    {
      id: '1',
      appName: 'AppName',
      appProvider: 'AppProvider',
      role: ['Editor'],
    },
    {
      id: '2',
      appName: 'AppName 2',
      appProvider: 'AppProvider 2',
      role: ['Admin', 'Editor'],
    },
  ]

  const handleSuspendUser = () => {
    console.log('Suspend user method')
  }

  const handleDeleteUser = () => {
    console.log('Delete user method')
  }

  const handleResetPasswordForUser = () => {
    console.log('Reset user pasword method')
  }

  const renderChips = (row: GridRowModel) => {
    return row.role.map((i: string) => {
      return (
        <Chip
          key={uniqueId(i)}
          color="secondary"
          label={i}
          type="plain"
          variant="filled"
          withIcon={false}
          sx={{ marginRight: '10px' }}
        />
      )
    })
  }

  return (
    <main className="user-details">
      <SubHeader
        title={t('content.account.userAccount')}
        hasBackButton={false}
      />
      <section>
        <Box
          sx={{ marginBottom: '75px', display: 'flex', alignItems: 'flex-end' }}
        >
          <Box>
            {/* TODO: Cannot use 'lable3' here due to error tracked in CPLP-1016 */}
            <Typography
              variant="h6"
              display="block"
              sx={{ paddingBottom: '10px' }}
            >
              {parsedUser.name}, {parsedUser.email}
            </Typography>
            <Button
              color="secondary"
              onClick={handleSuspendUser}
              size="small"
              variant="outlined"
              startIcon={<PowerSettingsNewOutlinedIcon />}
              sx={{ marginRight: '8px' }}
            >
              {t('content.account.suspendAccount')}
            </Button>
            <Button
              color="secondary"
              onClick={handleDeleteUser}
              size="small"
              variant="outlined"
              startIcon={<CancelOutlinedIcon />}
              sx={{ marginRight: '8px' }}
            >
              {t('content.account.deleteAccount')}
            </Button>
            <Button
              color="secondary"
              onClick={handleResetPasswordForUser}
              size="small"
              variant="outlined"
              startIcon={<RestartAltOutlinedIcon />}
            >
              {t('content.account.resetPasswordAccount')}
            </Button>
          </Box>

          <Box sx={{ marginLeft: 'auto' }}>
            <UserAvatar size="large" />
          </Box>
        </Box>

        <UserDetailsComponent userDetailsCards={userDetails} columns={3} />

        <Table
          title={t('content.account.appPermissionTable.title')}
          columns={[
            {
              field: 'id',
              hide: true,
            },
            { field: 'appName', headerName: t('global.field.last'), flex: 1 },
            {
              field: 'appProvider',
              headerName: t('global.field.first'),
              flex: 1,
            },
            {
              field: 'role',
              headerName: t('global.field.role'),
              flex: 1,
              renderCell: ({ row }) => renderChips(row),
            },
            // {
            //   field: 'details',
            //   headerName: t('global.field.details'),
            //   flex: 1,
            //   renderCell: () => (
            //     <IconButton
            //       color="secondary"
            //       onClick={() => console.log('Link to app')}
            //     >
            //       <ArrowForwardIcon />
            //     </IconButton>
            //   ),
            // },
          ]}
          rows={userAppRoles}
          rowsCount={userAppRoles.length}
          getRowId={(row: { [key: string]: string }) => row.id}
          sx={{ marginTop: '80px' }}
          hideFooter
        />
      </section>
    </main>
  )
}
