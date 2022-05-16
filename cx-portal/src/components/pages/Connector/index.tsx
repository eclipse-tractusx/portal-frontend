import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()
  return (
    <main>
      <p>{t('content.connector.message')}</p>
    </main>
  )
}
