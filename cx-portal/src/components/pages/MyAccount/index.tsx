import './MyAccount.scss'
import SubHeader from '../../shared/frame/SubHeader'
import { Box } from '@mui/material'
import { Button, UserDetails, UserAvatar } from 'cx-portal-shared-components'
import { RootState } from 'state/store'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

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

  const handleDeleteUser = () => {
    console.log('Delete user method')
  }

  return (
    <main className="my-account">
      <SubHeader title={t('pages.account')} hasBackButton={true} />
      <section>
        <Box
          sx={{ marginBottom: '75px', display: 'flex', alignItems: 'center' }}
        >
          <Button
            color="secondary"
            onClick={handleDeleteUser}
            size="small"
            variant="outlined"
          >
            {t('content.account.deleteAccount')}
          </Button>
          <Box sx={{ marginLeft: 'auto' }}>
            <UserAvatar />
          </Box>
        </Box>

        <UserDetails userDetailsCards={userDetails} columns={3} />
      </section>

      <hr />
      <p>{t('content.account.token')}</p>
      <Button
        color="secondary"
        onClick={() => {
          navigator.clipboard.writeText(token)
        }}
        size="small"
      >
        {t('content.account.copy_to_clipboard')}
      </Button>
      <pre>{JSON.stringify(parsedToken, null, 2)}</pre>
    </main>
  )
}
