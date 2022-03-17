import { useTranslation } from 'react-i18next'
import './Dashboard.css'

export default function Dashboard() {
  const { t } = useTranslation()
  return (
    <main className="Dashboard">
      <h2>{t('pages.dashboard')}</h2>
      <p>{t('content.dashboard.welcome')}</p>
    </main>
  )
}
