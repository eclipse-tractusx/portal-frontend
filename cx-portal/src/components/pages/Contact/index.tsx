import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation('footer', { keyPrefix: 'contact' })
  return (
    <main>
      <h2>{t('title')}</h2>
      <p>{t('message')}</p>
    </main>
  )
}
