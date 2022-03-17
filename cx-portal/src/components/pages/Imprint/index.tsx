import { useTranslation } from 'react-i18next'

export default function Imprint() {
  const { t } = useTranslation()
  return (
    <main>
      <h2>{t('pages.imprint')}</h2>
      <p>{t('content.imprint.message')}</p>
    </main>
  )
}
