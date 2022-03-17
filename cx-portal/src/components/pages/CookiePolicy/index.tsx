import { useTranslation } from 'react-i18next'

export default function CookiePolicy() {
  const { t } = useTranslation()
  return (
    <main>
      <h2>{t('pages.cookiepolicy')}</h2>
      <p>{t('content.cookiepolicy.message')}</p>
    </main>
  )
}
