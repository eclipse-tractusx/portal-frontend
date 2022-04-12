import { useTranslation } from 'react-i18next'

export default function Privacy() {
  const { t } = useTranslation('footer', { keyPrefix: 'privacy' })
  return (
    <main>
      <h2>{t('title')}</h2>
      <p>{t('message')}</p>
    </main>
  )
}
