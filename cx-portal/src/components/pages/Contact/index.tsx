import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()
  return (
    <main>
      <h2>{t('pages.contact')}</h2>
      <p>{t('content.contact.message')}</p>
    </main>
  )
}
