import { useTranslation } from 'react-i18next'
import { Typography, StaticTable, TableType } from 'cx-portal-shared-components'
import './AppDetailProvider.scss'

export default function AppDetailProvider() {
  const { t } = useTranslation()

  const tableData: TableType = {
    head: [
      t('content.appdetail.providerInformation.appProvider'),
      t('content.appdetail.providerInformation.website'),
      t('content.appdetail.providerInformation.email'),
      t('content.appdetail.providerInformation.phone'),
    ],
    body: [
      ['Catena-X'],
      ['https://catena-x.com'],
      ['contact@catena-x.com'],
      ['+49555667788'],
    ],
  }

  return (
    <div className="appdetail-provider">
      <div className="provider-content">
        <div className="container">
          <Typography variant="h4">
            {t('content.appdetail.providerInformation.heading')}
          </Typography>
          <Typography variant="body2">
            {t('content.appdetail.providerInformation.message')}
          </Typography>
          <a href="/#" className="product-desc">
            + more
          </a>
        </div>
      </div>
      <div className="privacy-table">
        <div className="container">
          <StaticTable data={tableData} horizontal={true} />
        </div>
      </div>
    </div>
  )
}
