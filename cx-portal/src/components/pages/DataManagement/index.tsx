import { useTranslation } from 'react-i18next'

export default function DataManagement() {
  const { t } = useTranslation()
  return (
    <main>
      <h2>{t('pages.datamanagement')}</h2>
      <p>{t('content.datamanagement.message')}</p>
    </main>
  )
}
