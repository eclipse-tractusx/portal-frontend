import { useSelector } from 'react-redux'
import { dataSelector } from 'features/admin/service/sdetail'
import Render from './Render'

export default function Retrieve() {
  const item = useSelector(dataSelector)

  return item && <Render item={item} />
}
