import { useTranslation } from 'react-i18next'

export default function ServiceMarketplace() {
  const { t } = useTranslation('footer', { keyPrefix: 'servicemarketplace' })
  return (
    <main>
      <h2>{t('title')}</h2>
      <p>{t('message')}</p>
    </main>
  )
}
