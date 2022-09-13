import { useTranslation } from 'react-i18next'
import { Typography, StaticTable, TableType } from 'cx-portal-shared-components'
import { ServiceRequest } from 'features/serviceMarketplace/serviceApiSlice'
import './MarketplaceProvider.scss'

export default function MarketplaceProvider({
  item,
}: {
  item: ServiceRequest
}) {
  const { t } = useTranslation('', {
    keyPrefix: 'content.appdetail.providerInformation',
  })

  const tableData: TableType = {
    head: [t('appProvider'), t('website'), t('email'), t('phone')],
    body: [[item.provider], ['test'], [item.contactEmail], ['0987654321']],
  }

  return (
    <div className="marketplace-provider">
      <div className="marketplace-content">
        <Typography variant="h4">{t('heading')}</Typography>
        <Typography variant="body2">{t('message')}</Typography>
      </div>
      <StaticTable data={tableData} horizontal={true} />
    </div>
  )
}
