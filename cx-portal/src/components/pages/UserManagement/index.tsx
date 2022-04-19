import { useState } from 'react'
import { AddUserOverlay } from './AddUserOverlay'
import { ActiveUserTable } from './ActiveUserTable'
import StageSection from './StageSection'
import { AppArea } from './AppArea'
import './UserManagement.scss'

export default function UserManagement() {
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

  return (
    <main className="UserManagement">
      <AddUserOverlay
        openDialog={open}
        handleClose={closeAddUserLayout}
        handleConfirm={confirmNewUser}
      />
      <StageSection />
      <AppArea />
      <ActiveUserTable onAddUserButtonClick={openAddUserLayout} />
    </main>
  )
}
