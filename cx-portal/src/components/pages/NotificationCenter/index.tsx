import { useTranslation } from 'react-i18next'

export default function NotificationCenter() {
  const { t } = useTranslation()
  return (
    <main>
      <h2>{t('pages.notifications')}</h2>
      <p>content of the page</p>
    </main>
  )
}
