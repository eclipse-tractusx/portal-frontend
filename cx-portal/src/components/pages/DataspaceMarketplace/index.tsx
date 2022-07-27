import { useTranslation } from 'react-i18next'

export default function DataspaceMarketplace() {
  const { t } = useTranslation('footer', { keyPrefix: 'dataspacemarketplace' })
  return (
    <main>
      <h2>{t('title')}</h2>
      <p>{t('message')}</p>
    </main>
  )
}
