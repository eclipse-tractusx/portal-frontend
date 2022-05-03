import { AddUserOverlay } from './AddUserOverlay'
import { ActiveUserTable } from './ActiveUserTable'
import StageSection from './StageSection'
import { AppArea } from './AppArea'
import { useDispatch } from 'react-redux'
import { openAdd } from 'state/features/adminUser/actions'
import './UserManagement.scss'

export default function UserManagement() {
  const dispatch = useDispatch()

  return (
    <main className="UserManagement">
      <AddUserOverlay />
      <StageSection />
      <AppArea />
      <ActiveUserTable onAddUserButtonClick={() => dispatch(openAdd())} />
    </main>
  )
}
