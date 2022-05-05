import { useState } from 'react'
import AppUserDetailsHeader from './components/AppUserDetailsHeader'
import { useTranslation } from 'react-i18next'
import { AppUserDetailsTable } from './components/AppUserDetailsTable'
import SubHeader from 'components/shared/frame/SubHeader'
import AddUserRightOverlay from '../AddUserRightOverlay'
import './AppUserDetails.scss'

export type UserRole = {
  name: string
  description: string
}

export default function AppUserDetails() {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)

  const openAddUserRightLayout = () => {
    setOpen(true)
  }

  const closeAddUserRightLayout = () => {
    setOpen(false)
  }

  const confirmNewUserRight = () => {
    console.log('confirmed user right!')
  }

  const roles: UserRole[] = [
    { name: 'Admin', description: 'Role Description' },
    { name: 'User', description: 'Role Description' },
    { name: 'Editor', description: 'Role Description' },
  ]

  return (
    <main className="app-user-details">
      <AddUserRightOverlay
        openDialog={open}
        handleClose={closeAddUserRightLayout}
        handleConfirm={confirmNewUserRight}
      />

      <SubHeader
        title={t('content.usermanagement.appUserDetails.headline')}
        hasBackButton={true}
      />

      {roles.length > 0 && (
        <>
          <AppUserDetailsHeader roles={roles} />
          <AppUserDetailsTable onAddUserButtonClick={openAddUserRightLayout} />
        </>
      )}
    </main>
  )
}
