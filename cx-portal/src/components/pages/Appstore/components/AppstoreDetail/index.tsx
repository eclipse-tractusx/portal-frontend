import { useParams } from 'react-router-dom'

export default function AppstoreDetail() {
  const params = useParams()
  const appId = params || 0
  console.log(appId)

  //TODO:
  //read from redux store
  const app = {
    id: appId.appId,
    title: 'Amazing Material Traceability',
    vendor: 'Catena-X',
    description: 'i18n.app.1001.description',
    license: 'Catena-X Unbelievable License',
    rating: 4.7,
  }

  return (
    <div className="appstore_app">
      <p className="id">{app.id}</p>
      <h3>{app.title}</h3>
      <p className="description">{app.description}</p>
      <p className="vendor">{app.vendor}</p>
      <p>
        <button>buy</button>
      </p>
    </div>
  )
}
