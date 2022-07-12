import { Dialog } from 'cx-portal-shared-components'
import { stateSelector } from 'features/control/overlay/slice'
import { Overlay, OverlayState } from 'features/control/overlay/types'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddBPN from './overlays/AddBPN'

const getOverlay = (overlay: OverlayState) => {
  if (overlay.type === Overlay.ADD_BPN) {
    return <AddBPN companyUserId={overlay.id} />
  }
}

export default function MainOverlay() {
  const overlay = useSelector(stateSelector)
  const navigate = useNavigate()

  useEffect(() => {
    navigate({
      search:
        overlay.type === Overlay.NONE
          ? ''
          : `?overlay=${overlay.type}${overlay.id ? ':' + overlay.id : ''}`,
    })
  }, [navigate, overlay])

  return (
    <Dialog open={overlay.type !== Overlay.NONE}>{getOverlay(overlay)}</Dialog>
  )
}
