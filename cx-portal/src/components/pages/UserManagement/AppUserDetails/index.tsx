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

  /* !! the following section will need to get replaced with the BL and an API integration */
  const roles: UserRole[] = [
    { name: 'Admin', description: 'The Admin can do everything' },
    { name: 'User', description: 'The User can view cars' },
    { name: 'Editor', description: 'The Editor can edit cars' },
    { name: 'Purchaser', description: 'The Purchaser can purchase cars' },
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
        hasBackButton={false}
        hasBreadcrumb={true}
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
