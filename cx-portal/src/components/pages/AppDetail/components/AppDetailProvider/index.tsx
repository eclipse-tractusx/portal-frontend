import { useTranslation } from 'react-i18next'
import { Typography, StaticTable, TableType } from 'cx-portal-shared-components'
import './AppDetailProvider.scss'

export default function AppDetailProvider() {
  const { t } = useTranslation('', {
    keyPrefix: 'content.appdetail.providerInformation',
  })

  const tableData: TableType = {
    head: [t('appProvider'), t('website'), t('email'), t('phone')],
    body: [
      ['Catena-X'],
      ['https://catena-x.net'],
      ['contact@catena-x.net'],
      ['+49555667788'],
    ],
  }

  return (
    <div className="appdetail-provider">
      <div className="provider-content">
        <Typography variant="h4">{t('heading')}</Typography>
        <Typography variant="body2">{t('message')}</Typography>
        <a href="/#" className="product-desc">
          + more
        </a>
      </div>
      <StaticTable data={tableData} horizontal={true} />
    </div>
  )
}
