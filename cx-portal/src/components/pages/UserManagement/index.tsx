import { AddUserOverlay } from './AddUserOverlay'
import { ActiveUserTable } from './ActiveUserTable'
import StageSection from './StageSection'
import { AppArea } from './AppArea'
import { StageSubNavigation } from './StageSubNavigation/StageSubNavigation'
import './UserManagement.scss'

export default function UserManagement() {
  return (
    <main className="UserManagement">
      <AddUserOverlay />
      <StageSection />
      <StageSubNavigation />
      <AppArea />
      <ActiveUserTable />
    </main>
  )
}
