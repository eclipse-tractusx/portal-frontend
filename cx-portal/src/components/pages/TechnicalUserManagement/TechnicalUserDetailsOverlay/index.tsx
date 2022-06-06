import { useParams } from 'react-router-dom'
import Load from './Load'

export default function TechnicalUserDetails() {
  const { appId } = useParams()

  return (
    <main className="technical-user-details">
      <Load id={appId!} />
    </main>
  )
}
