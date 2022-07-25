import { Box } from '@mui/material'
import {
  Button,
  UserAvatar,
  Typography,
  Table,
  Chip,
  PageHeader,
} from 'cx-portal-shared-components'
import { RootState } from 'features/store'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import uniqueId from 'lodash/uniqueId'
import { GridRowModel } from '@mui/x-data-grid/models/gridRows'
import { useEffect } from 'react'
import { fetchOwn } from 'features/admin/userOwn/actions'
import './MyAccount.scss'
import { ownUserSelector } from 'features/admin/userOwn/slice'
import { userDetailsToCards } from 'features/admin/userOwn/mapper'
import { UserDetails } from 'components/shared/basic/UserDetails'

export default function MyAccount() {
  const { t } = useTranslation()
  const parsedToken = useSelector((state: RootState) => state.user.parsedToken)
  const token = useSelector((state: RootState) => state.user.token)
  const ownUser = useSelector(ownUserSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOwn())
  }, [dispatch])

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
          type="plain"
          variant="filled"
          withIcon={false}
          sx={{ marginRight: '10px' }}
        />
      )
    })
  }

  console.log('render')

  return (
    <main className="my-account">
      <PageHeader
        title={t('pages.account')}
        topPage={false}
        headerHeight={200}
      />

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

        {ownUser && (
          <UserDetails
            userDetailsCards={userDetailsToCards(ownUser)}
            userInfo={ownUser}
            columns={3}
          />
        )}

        <Table
          title={t('content.account.appPermissionTable.title')}
          columns={[
            {
              field: 'id',
              hide: true,
            },
            {
              field: 'appName',
              headerName: t('content.account.appPermissionTable.appName'),
              flex: 1,
            },
            {
              field: 'appProvider',
              headerName: t('content.account.appPermissionTable.appProvider'),
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
          disableColumnMenu
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
            <pre>{JSON.stringify(parsedToken, null, 2)}</pre>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </main>
  )
}
