import { show } from 'features/control/overlay/actions'
import { Overlay } from 'features/control/overlay/types'
import { useDispatch } from 'react-redux'

export default function OpenOverlay({
  overlay,
  id,
}: {
  overlay: Overlay | string
  id: string
}) {
  const dispatch = useDispatch()
  dispatch(show(overlay as Overlay, id))
  return null
}
