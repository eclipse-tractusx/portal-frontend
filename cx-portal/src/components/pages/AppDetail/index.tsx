import { Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import AppDetailHeader from './components/AppDetailHeader'

export default function AppDetail() {
  const { t } = useTranslation()

  return (
    <main>
      <Typography variant="h3">{t('pages.appdetails')}</Typography>
      <AppDetailHeader />
    </main>
  )
}
