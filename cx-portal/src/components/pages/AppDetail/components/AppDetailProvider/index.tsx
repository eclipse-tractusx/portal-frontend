import { useTranslation } from 'react-i18next'
import { Typography, StaticTable, TableType } from 'cx-portal-shared-components'
import { AppDetails } from 'features/apps/apiSlice'
import './AppDetailProvider.scss'

export default function AppDetailProvider({ item }: { item: AppDetails }) {
  const { t } = useTranslation('', {
    keyPrefix: 'content.appdetail.providerInformation',
  })

  const tableData: TableType = {
    head: [t('appProvider'), t('website'), t('email'), t('phone')],
    body: [
      [item.provider],
      [item.providerUri === 'ERROR' ? '' : item.providerUri],
      [item.contactEmail],
      [item.contactNumber],
    ],
  }

  return (
    <div className="appdetail-provider">
      <div className="provider-content">
        <Typography variant="h4">{t('heading')}</Typography>
        <Typography variant="body2">{t('message')}</Typography>
      </div>
      <StaticTable data={tableData} horizontal={true} />
    </div>
  )
}
