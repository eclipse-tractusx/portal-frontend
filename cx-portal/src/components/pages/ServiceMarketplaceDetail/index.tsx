import { Button } from 'cx-portal-shared-components'
import { useNavigate, useParams } from 'react-router-dom'
import { t } from 'i18next'
import MarketplaceContentDetails from './MarketplaceContentDetails'
import './Marketplace.scss'
import { useFetchServiceQuery } from 'features/serviceMarketplace/serviceApiSlice'

export default function ServiceMarketplaceDetail() {
  const navigate = useNavigate()
  const { serviceId } = useParams()

  const { data } = useFetchServiceQuery(serviceId ?? '')

  return (
    <main>
      <Button
        color="secondary"
        size="small"
        onClick={() => navigate('/servicemarketplace')}
        sx={{ margin: '50px 0px 0px 90px' }}
      >
        {t('global.actions.back')}
      </Button>
      <div className="marketplace-main">
        {data && <MarketplaceContentDetails item={data} />}
      </div>
    </main>
  )
}
