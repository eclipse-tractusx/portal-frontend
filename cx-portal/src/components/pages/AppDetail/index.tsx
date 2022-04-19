import { Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import AppDetailHeader from './components/AppDetailHeader'

export default function AppDetail() {
  const { t } = useTranslation()

  const appItem = {
    id: 'c7b217c5-1002-46bc-bcd2-57df0e9e46d6',
    title: 'Dismantler App',
    subtitle: 'SAP',
    description: 'SAP App Dismantler App Details',
    price: 'free of charge',
    rating: 4.1,
    useCases: ['Circular Economy'],
    image: {
      src: 'https://catenaxdev003util.blob.core.windows.net/assets/apps/images/Lead-Dismantler.png',
      alt: 'Part Chain',
    },
  }

  return (
    <main>
      <Typography variant="h3">{t('pages.appdetails')}</Typography>
      <AppDetailHeader item={appItem} />
    </main>
  )
}
