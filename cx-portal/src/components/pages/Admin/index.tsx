import { useTranslation } from 'react-i18next'

export default function Admin() {
  const { t } = useTranslation()
  return (
    <main>
      <h2>{t('pages.admin')}</h2>
      <p>content of the admin area</p>
    </main>
  )
}
