import { show } from 'features/control/overlay/actions'
import { useDispatch } from 'react-redux'
import { OVERLAYS } from 'types/Constants'

export default function OpenOverlay({
  overlay,
  id,
}: {
  overlay: string
  id: string
}) {
  const dispatch = useDispatch()
  dispatch(show(overlay as OVERLAYS, id))
  return null
}
