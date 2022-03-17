import { useTranslation } from 'react-i18next'

export default function Organization() {
  const { t } = useTranslation()
  return (
    <main>
      <h2>{t('pages.organization')}</h2>
      <p>content of the page</p>
    </main>
  )
}
