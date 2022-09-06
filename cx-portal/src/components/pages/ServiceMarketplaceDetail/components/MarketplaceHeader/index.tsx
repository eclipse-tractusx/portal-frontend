import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { AppDetails } from 'features/apps/details/types'
import { useParams } from 'react-router-dom'
import './MarketplaceHeader.scss'
import { fetch } from 'features/apps/details/actions'
import { itemSelector } from 'features/apps/details/slice'
import { userSelector } from 'features/user/slice'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'

export interface MarketplaceHeaderProps {
  item: AppDetails
}

export default function MarketplaceHeader({ item }: MarketplaceHeaderProps) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { appId } = useParams()
  const user = useSelector(userSelector)
  const appData = useSelector(itemSelector)

  useEffect(() => {
    dispatch(fetch(appId!))
  }, [dispatch, appId])

  const getSubscribeBtn = () => {
    return (
      <Button
        color="primary"
        className="subscribe-btn"
        onClick={() => dispatch(show(OVERLAYS.SERVICE_REQUEST))}
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
