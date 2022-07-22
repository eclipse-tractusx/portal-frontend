import { Dialog } from 'cx-portal-shared-components'
import { stateSelector } from 'features/control/overlay/slice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAction, getOverlay } from 'services/AccessService'
import { OVERLAYS } from 'types/Constants'

export default function MainOverlay() {
  const overlay = useSelector(stateSelector)
  const navigate = useNavigate()

  useEffect(() => {
    navigate({
      search:
        overlay.type === OVERLAYS.NONE
          ? ''
          : `?overlay=${overlay.type}${overlay.id ? ':' + overlay.id : ''}`,
    })
  }, [navigate, overlay])

  return (
    <>
      {overlay.type === OVERLAYS.NONE && getAction(overlay.id) ? (
        getAction(overlay.id)?.element
      ) : (
        <Dialog open={overlay.type !== OVERLAYS.NONE}>
          {getOverlay(overlay)}
        </Dialog>
      )}
    </>
  )
}
