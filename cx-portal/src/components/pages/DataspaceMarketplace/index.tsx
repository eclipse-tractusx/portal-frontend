import { useTranslation } from 'react-i18next'

export default function DataspaceMarketplace() {
  const { t } = useTranslation()
  return (
    <main>
      <h2>{t('dataspacemarketplace.title')}</h2>
      <p>{t('dataspacemarketplace.message')}</p>
    </main>
  )
}
