import { useDispatch } from 'react-redux'
import { Button, Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { ServiceRequest } from 'features/serviceMarketplace/serviceApiSlice'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'
import './MarketplaceHeader.scss'

export interface MarketplaceHeaderProps {
  item: ServiceRequest
}

export default function MarketplaceHeader({ item }: MarketplaceHeaderProps) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { serviceId } = useParams()

  const getSubscribeBtn = () => {
    return (
      <Button
        color="primary"
        className="subscribe-btn"
        onClick={() => dispatch(show(OVERLAYS.SERVICE_REQUEST, serviceId))}
      >
        {t('content.appdetail.subscribe')}
      </Button>
    )
  }

  return (
    <div className="marketplace-header">
      <div className="content">
        <Typography variant="body2" className="provider">
          {item.provider}
        </Typography>
        <Typography variant="h4" className="heading">
          {item.title}
        </Typography>
        <Typography variant="body2" className="price">
          {item.price}
        </Typography>
        {getSubscribeBtn()}
      </div>
    </div>
  )
}
