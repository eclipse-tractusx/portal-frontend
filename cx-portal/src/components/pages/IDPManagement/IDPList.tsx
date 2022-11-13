import {
  IdentityProvider,
  useFetchIDPListQuery,
} from 'features/admin/idpApiSlice'
import { useSelector } from 'react-redux'
import { updateIDPSelector } from 'features/control/updatesSlice'
import IDPListItem from './IDPListItem'
import './style.scss'

export const IDPList = () => {
  const update = useSelector(updateIDPSelector)
  const { data } = useFetchIDPListQuery(update)

  return (
    <ul className="idp-list">
      {data &&
        data
          .slice()
          .sort((a: IdentityProvider, b: IdentityProvider) =>
            a.alias.localeCompare(b.alias)
          )
          .map((idp) => (
            <li key={idp.identityProviderId}>
              <IDPListItem idp={idp} />
            </li>
          ))}
    </ul>
  )
}
