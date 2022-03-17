import { useTranslation } from 'react-i18next'

export default function DigitalTwins() {
  const { t } = useTranslation()
  return (
    <main>
      <h2>{t('pages.digitaltwin')}</h2>
      <p>{t('content.digitaltwin.message')}</p>
    </main>
  )
}
