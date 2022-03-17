import { useTranslation } from 'react-i18next'

export default function Privacy() {
  const { t } = useTranslation()
  return (
    <main>
      <h2>{t('pages.privacy')}</h2>
      <p>{t('content.privacy.message')}</p>
    </main>
  )
}
