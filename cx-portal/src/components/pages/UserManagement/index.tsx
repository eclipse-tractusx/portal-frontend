import { useState } from 'react'
import { AddUserOverlay } from './AddUserOverlay'
import { ActiveUserTable } from './ActiveUserTable'
import StageSection from './StageSection'
import { AppArea } from './AppArea'
import './UserManagement.scss'

export default function UserManagement() {
  const [open, setOpen] = useState(false)

  return (
    <main className="UserManagement">
      <AddUserOverlay openDialog={open} handleClose={() => setOpen(false)} />
      <StageSection />
      <AppArea />
      <ActiveUserTable onAddUserButtonClick={() => setOpen(true)} />
    </main>
  )
}
