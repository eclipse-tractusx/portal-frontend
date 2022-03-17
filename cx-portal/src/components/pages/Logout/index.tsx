import { useTranslation } from 'react-i18next'
import UserService from '../../../services/UserService'

export default function Logout() {
  const { t } = useTranslation()
  UserService.doLogout({ redirectUri: document.location.origin + '/' })
  return (
    <main className="Logout">
      <h2>{t('pages.logout')}</h2>
      <p>{t('content.logout.message')}</p>
    </main>
  )
}
