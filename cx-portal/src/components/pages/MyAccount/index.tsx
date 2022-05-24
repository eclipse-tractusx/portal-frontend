import './MyAccount.scss'
import SubHeader from '../../shared/frame/SubHeader'
import { Box } from '@mui/material'
import {
  Button,
  UserDetails,
  UserAvatar,
  Typography,
  Table,
  Chip,
} from 'cx-portal-shared-components'
import { RootState } from 'state/store'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import uniqueId from 'lodash/uniqueId'
import { GridRowModel } from '@mui/x-data-grid/models/gridRows'

export default function MyAccount() {
  const { t } = useTranslation()
  const parsedToken = useSelector((state: RootState) => state.user.parsedToken)
  const token = useSelector((state: RootState) => state.user.token)

  const userDetails = [
    {
      category: 'Personal Information',
      items: {
        name: { label: 'Name', value: 'Max' },
        surname: { label: 'Nachname', value: 'Mustermann' },
        email: { label: 'E-Mail', value: 'm.musterman@test.de' },
        bpn: { label: 'BPN', value: '1234567' },
      },
    },
    {
      category: 'Status Information',
      items: {
        status: { label: 'Status', value: 'Aktiv' },
        userCreated: { label: 'Nutzer angelegt', value: '17.02.1989' },
      },
    },
    {
      category: 'Issuer Information',
      items: {
        organisation: { label: 'Organisation', value: 'BMW' },
        adminName: { label: 'Admin Name', value: 'Admin Muster' },
        adminMail: { label: 'Admin E-Mail', value: 'admin.muster@test.de' },
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

  const handleDeleteUser = () => {
    console.log('Delete user method')
  }

  const renderChips = (row: GridRowModel) => {
    return row.role.map((i: string) => {
      return (
        <Chip
          key={uniqueId(i)}
          color="secondary"
          label={i}
          type="confirm"
          variant="filled"
          withIcon={false}
          sx={{ marginRight: '10px' }}
        />
      )
    })
  }

  return (
    <main className="my-account">
      <SubHeader title={t('pages.account')} hasBackButton={true} />
      <section>
        <Box
          sx={{ marginBottom: '75px', display: 'flex', alignItems: 'flex-end' }}
        >
          {/* TODO: DEV only needs to be removed when going PROD */}
          <Button
            color="secondary"
            onClick={async () => {
              await navigator.clipboard.writeText(token)
            }}
            size="small"
            variant="outlined"
            startIcon={<WarningAmberOutlinedIcon />}
            sx={{ marginRight: '8px' }}
          >
            {t('content.account.copy_to_clipboard')}
          </Button>
          <Button
            color="secondary"
            onClick={handleDeleteUser}
            size="small"
            variant="outlined"
          >
            {t('content.account.deleteAccount')}
          </Button>
          <Box sx={{ marginLeft: 'auto' }}>
            <UserAvatar size="large" />
          </Box>
        </Box>

        <UserDetails userDetailsCards={userDetails} columns={3} />

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
          ]}
          rows={userAppRoles}
          rowsCount={userAppRoles.length}
          getRowId={(row: { [key: string]: string }) => row.id}
          sx={{ marginTop: '80px' }}
          hideFooter
        />
      </section>

      {/* TODO: DEV only needs to be removed when going PROD */}
      <Accordion sx={{ marginBottom: '20px', boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>{t('content.account.token')}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ marginBottom: '20px' }}>
          <Typography>
            <code>{JSON.stringify(parsedToken, null, 2)}</code>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </main>
  )
}
