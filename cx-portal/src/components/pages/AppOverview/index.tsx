import { useTranslation } from 'react-i18next'

export default function AppOverview() {
  const { t } = useTranslation()
  return (
    <main>
      <h2>{t('pages.appoverview')}</h2>
      <p>{t('content.appoverview.message')}</p>
    </main>
  )
}
