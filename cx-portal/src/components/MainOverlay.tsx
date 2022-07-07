import { Dialog } from 'cx-portal-shared-components'
import { stateSelector } from 'features/control/overlay/slice'
import { Overlay, OverlayState } from 'features/control/overlay/types'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddBPN from './overlays/AddBPN'
import { AddUser } from './overlays/AddUser'
import AppDetail from './overlays/AppDetail'
import InviteForm from './overlays/InviteForm'
import UserInfo from './overlays/UserInfo'
import BusinessPartnerDetail from './pages/PartnerNetwork/BusinessPartnerDetailOverlay/BusinessPartnerDetail'

const getOverlay = (overlay: OverlayState) => {
  switch (overlay.type) {
    case Overlay.ADD_USER:
      return <AddUser  />
    case Overlay.USER:
      return <UserInfo id={overlay.id} />
    case Overlay.ADD_BPN:
      return <AddBPN companyUserId={overlay.id} />
    case Overlay.INVITE:
      return <InviteForm />
    case Overlay.COMPANY:
      return <BusinessPartnerDetail id={overlay.id} />
    case Overlay.APP:
      return <AppDetail id={overlay.id} />
    default:
      return <></>
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
