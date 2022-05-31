import {
  Dialog,
  DialogContent,
  DialogHeader,
} from 'cx-portal-shared-components'
import { show } from 'features/control/overlay/actions'
import { stateSelector } from 'features/control/overlay/slice'
import { Overlay } from 'features/control/overlay/types'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import AppDetailContent from './pages/AppDetail/AppDetailContent'
import InviteForm from './pages/InviteBusinessPartner/components/InviteForm'
import BusinessPartnerDetail from './pages/PartnerNetwork/BusinessPartnerDetailOverlay/BusinessPartnerDetail'

const getOverlayTitle = (type: Overlay) => {
  switch (type) {
    case Overlay.COMPANY:
      return 'content.partnernetwork.overlay.title'
    case Overlay.APP:
      return '' //no title or pages.appdetails
    default:
      return ''
  }
}

export default function MainOverlay() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const overlay = useSelector(stateSelector)
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
        {overlay.type === Overlay.COMPANY && (
          <BusinessPartnerDetail id={overlay.id} />
        )}
        {overlay.type === Overlay.APP && <AppDetailContent id={overlay.id} />}
        {overlay.type === Overlay.INVITE && <InviteForm />}
      </DialogContent>
    </Dialog>
  )
}
