import {
  Dialog,
  DialogContent,
  DialogHeader,
} from 'cx-portal-shared-components'
import { show } from 'features/control/overlay/actions'
import { stateSelector } from 'features/control/overlay/slice'
import { Overlay, OverlayState } from 'features/control/overlay/types'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AppDetailContent from './pages/AppDetail/AppDetailContent'
import InviteForm from './pages/InviteBusinessPartner/components/InviteForm'
import BusinessPartnerDetail from './pages/PartnerNetwork/BusinessPartnerDetailOverlay/BusinessPartnerDetail'

const getOverlayTitle = (type: Overlay) => {
  switch (type) {
    case Overlay.INVITE:
      return 'content.invite.title'
    case Overlay.COMPANY:
      return 'content.partnernetwork.overlay.title'
    case Overlay.APP:
      return '' //no title or pages.appdetails
    default:
      return ''
  }
}

const getOverlay = (overlay: OverlayState) => {
  switch (overlay.type) {
    case Overlay.INVITE:
      return <InviteForm />
    case Overlay.COMPANY:
      return <BusinessPartnerDetail id={overlay.id} />
    case Overlay.APP:
      return <AppDetailContent id={overlay.id} />
    default:
      return <></>
  }
}

export default function MainOverlay() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
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
    <Dialog open={overlay.type !== Overlay.NONE}>
      <DialogHeader
        {...{
          title: t(getOverlayTitle(overlay.type)),
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(show(Overlay.NONE, '')),
        }}
      />
      <DialogContent>
        {getOverlay(overlay)}
      </DialogContent>
    </Dialog>
  )
}
