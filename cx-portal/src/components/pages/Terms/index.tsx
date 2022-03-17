import { useTranslation } from 'react-i18next'

export default function Terms() {
  const { t } = useTranslation()
  return (
    <main>
      <h2>{t('pages.terms')}</h2>
      <p>{t('content.terms.message')}</p>
    </main>
  )
}
