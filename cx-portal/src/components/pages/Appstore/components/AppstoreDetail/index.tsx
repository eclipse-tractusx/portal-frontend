import { useParams } from 'react-router-dom'

import './AppstoreDetail.css'

export default function AppstoreDetail() {
  const params = useParams()
  const appId = params || 0
  console.log(appId)

  //TODO:
  //read from redux store
  const app = {
    id: '1001',
    name: 'Amazing Material Traceability',
    vendor: 'Catena-X',
    version: '0.1.0-beta',
    description: 'i18n.app.1001.description',
    license: 'Catena-X Unbelievable License',
    rating: 4.7,
  }

  return (
    <div className="appstore_app">
      <p className="id">{app.id}</p>
      <h3>{app.name}</h3>
      <p className="description">{app.description}</p>
      <p className="vendor">{app.vendor}</p>
      <p>
        <button>buy</button>
      </p>
    </div>
  )
}
