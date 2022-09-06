import { Button } from 'cx-portal-shared-components'
import { useNavigate, useParams } from 'react-router-dom'
import { t } from 'i18next'
import { useFetchAppDetailsQuery } from 'features/apps/apiSlice'
import MarketplaceContentDetails from './MarketplaceContentDetails'
import './Marketplace.scss'

export default function ServiceMarketplaceDetail() {
  const navigate = useNavigate()
  const { serviceId } = useParams()
  const { data } = useFetchAppDetailsQuery('5cf74ef8-e0b7-4984-a872-474828beb5d3'!)

  return (
    <main >
      <Button
        color="secondary"
        size="small"
        onClick={() => navigate('/servicemarketplace')}
        sx={{ margin: "50px 0px 0px 90px" }}
      >
        {t('global.actions.back')}
      </Button>
      <div className="marketplace-main">
        {data && <MarketplaceContentDetails item={data} />}
      </div>
    </main>
  )
}
