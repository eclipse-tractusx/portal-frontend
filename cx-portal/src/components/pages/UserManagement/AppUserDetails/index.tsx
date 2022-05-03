import AppUserDetailsHeader from './components/AppUserDetailsHeader'
import { useTranslation } from 'react-i18next'
import { AppUserDetailsTable } from './components/AppUserDetalisTable'
import { useState } from 'react'
import { AddUserOverlay } from '../AddUserOverlay'
import SubHeader from 'components/shared/frame/SubHeader'
import './AppUserDetails.scss'

export type UserRole = {
  name: string
  description: string
}

export default function AppUserDetails() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const openAddUserLayout = () => {
    setOpen(true)
  }

  const closeAddUserLayout = () => {
    setOpen(false)
  }

  const confirmNewUser = () => {
    console.log('confirmed')
  }

  const roles: UserRole[] = [
    { name: 'Admin', description: 'Role Description' },
    { name: 'User', description: 'Role Description' },
    { name: 'Editor', description: 'Role Description' },
  ]

  return (
    <main className="app-user-details">
      <AddUserOverlay
        openDialog={open}
        handleClose={closeAddUserLayout}
        handleConfirm={confirmNewUser}
      />

      <SubHeader title={t('content.usermanagement.appUserDetails.headline')} />

      {roles.length > 0 && (
        <>
          <AppUserDetailsHeader roles={roles} />
          <AppUserDetailsTable onAddUserButtonClick={openAddUserLayout} />
        </>
      )}
    </main>
  )
}
