import { useTranslation } from 'react-i18next'

export default function Terms() {
  const { t } = useTranslation('footer', { keyPrefix: 'terms' })
  return (
    <main>
      <h2>{t('title')}</h2>
      <p>{t('message')}</p>
    </main>
  )
}
