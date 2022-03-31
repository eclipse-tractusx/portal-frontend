import { ActiveUserTable } from './ActiveUserTable'
import { AppArea } from './AppArea'

export default function UserManagement() {
  const onAddUserButtonClick = () => {
    console.log('add new user')
  }

  return (
    <main>
      <AppArea />
      <ActiveUserTable onAddUserButtonClick={onAddUserButtonClick} />
    </main>
  )
}
