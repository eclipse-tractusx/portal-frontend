import { useTranslation } from 'react-i18next'

export default function Help() {
  const { t } = useTranslation('help')

  const general = () => (
    <>
      <h3>{t('general.title')}</h3>
      <ul>
        {['what', 'goal'].map((topic) => (
          <li key={topic}>
            <p>{t(`general.${topic}.question`)}</p>
            <p>{t(`general.${topic}.answer`)}</p>
          </li>
        ))}
      </ul>
    </>
  )

  return (
    <main>
      <h2>{t('title')}</h2>
      <p>{t('message')}</p>
      {general()}
    </main>
  )
}
