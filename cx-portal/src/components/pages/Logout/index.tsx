import SignOut from 'components/actions/SignOut'
import { useTranslation } from 'react-i18next'

export default function Logout() {
  const { t } = useTranslation()
  return (
    <main className="Logout">
      <h2>{t('pages.logout')}</h2>
      <p>{t('content.logout.message')}</p>
      <SignOut />
    </main>
  )
}
