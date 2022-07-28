import { useTranslation } from 'react-i18next'

export default function ServiceMarketplace() {
  const { t } = useTranslation()
  return (
    <main>
      <h2>{t('servicemarketplace.title')}</h2>
      <p>{t('servicemarketplace.message')}</p>
    </main>
  )
}
