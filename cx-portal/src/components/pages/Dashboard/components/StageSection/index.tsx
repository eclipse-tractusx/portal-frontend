import { useTranslation } from 'react-i18next'
import './stage-section.scss'

export default function SearchSection() {
  const { t } = useTranslation()

  return (
    <div className="stage-section">
        <h2>{t('pages.dashboard')}</h2>
        <p>{t('content.dashboard.welcome')}</p>
    </div>
  )
}
