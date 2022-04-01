import { useTranslation } from 'react-i18next'
import { Typography } from 'cx-portal-shared-components'
import SearchSection from './components/SearchSection'
import StageSection from './components/StageSection'
import './dashboard.scss'

export default function Dashboard() {
  const { t } = useTranslation()

  return (
    <main className="dashboard">
      <StageSection />
      <SearchSection />
      <section>
        <Typography variant="h3" className="section-title">
          {t('content.dashboard.businessApplicationsSection.title')}
        </Typography>
      </section>
      <section>
        <Typography variant="h3" className="section-title">
          {t('content.dashboard.fromAppStoreSection.title')}
        </Typography>
      </section>
    </main>
  )
}
