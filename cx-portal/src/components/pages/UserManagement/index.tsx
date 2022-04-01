import { useState } from 'react'
import { AddUserOverlay } from './AddUserOverlay'
import { ActiveUserTable } from './ActiveUserTable'
import { AppArea } from './AppArea'

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
    <main>
      <AddUserOverlay
        openDialog={open}
        handleClose={closeAddUserLayout}
        handleConfirm={confirmNewUser}
      />
      <AppArea />
      <ActiveUserTable onAddUserButtonClick={openAddUserLayout} />
    </main>
  )
}
