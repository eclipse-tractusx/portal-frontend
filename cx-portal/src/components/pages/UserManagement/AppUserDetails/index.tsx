import AppUserDetailsHeader from './components/AppUserDetailsHeader'
import { useTranslation } from 'react-i18next'
import { AppUserDetailsTable } from './components/AppUserDetalisTable'
import SubHeader from 'components/shared/frame/SubHeader'
import './AppUserDetails.scss'

export type UserRole = {
  name: string
  description: string
}

export default function AppUserDetails() {
  const { t } = useTranslation()

  const openAddUserLayout = () => {
    // Open add user modal
  }

  const roles: UserRole[] = [
    { name: 'Admin', description: 'Role Description' },
    { name: 'User', description: 'Role Description' },
    { name: 'Editor', description: 'Role Description' },
  ]

  return (
    <main className="app-user-details">
      <SubHeader title={t('content.usermanagement.appUserDetails.headline')} hasBackButton={true} />

      {roles.length > 0 && (
        <>
          <AppUserDetailsHeader roles={roles} />
          <AppUserDetailsTable onAddUserButtonClick={openAddUserLayout} />
        </>
      )}
    </main>
  )
}
