import { useTranslation } from 'react-i18next'

export default function Connector() {
  const { t } = useTranslation()
  return (
    <main>
      <h2>{t('pages.connector')}</h2>
      <p>{t('content.connector.message')}</p>
    </main>
  )
}
