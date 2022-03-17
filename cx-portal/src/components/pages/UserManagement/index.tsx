import { useTranslation } from 'react-i18next'

export default function UserManagement() {
  const { t } = useTranslation()
  return (
    <main>
      <h2>{t('pages.usermanagement')}</h2>
      <p>content of the page</p>
    </main>
  )
}
