import { Dialog } from 'cx-portal-shared-components'
import { stateSelector } from 'features/control/overlay/slice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getAction, getOverlay } from 'services/AccessService'
import { OVERLAYS } from 'types/Constants'

export default function MainOverlay() {
  const { overlay } = useParams()
  const ov = useSelector(stateSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (overlay) {
      navigate({
        search:
          ov.type === OVERLAYS.NONE
            ? ''
            : `?overlay=${ov.type}${ov.id ? ':' + ov.id : ''}`,
      })
    }
  }, [navigate, overlay, ov])

  return (
    <>
      {ov.type === OVERLAYS.NONE && getAction(ov.id) ? (
        getAction(ov.id)?.element
      ) : (
        <Dialog modalBorderRadius={50} open={ov.type !== OVERLAYS.NONE}>
          {getOverlay(ov)}
        </Dialog>
      )}
    </>
  )
}
