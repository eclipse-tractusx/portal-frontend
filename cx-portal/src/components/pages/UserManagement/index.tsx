import { AddUserOverlay } from './AddUserOverlay'
import { ActiveUserTable } from './ActiveUserTable'
import StageSection from './StageSection'
import { AppArea } from './AppArea'
import { useDispatch } from 'react-redux'
import { openAddUser } from 'state/features/userAdministration/actions'
import './UserManagement.scss'

export default function UserManagement() {
  const dispatch = useDispatch()

  return (
    <main className="UserManagement">
      <AddUserOverlay />
      <StageSection />
      <AppArea />
      <ActiveUserTable onAddUserButtonClick={() => dispatch(openAddUser())} />
    </main>
  )
}
