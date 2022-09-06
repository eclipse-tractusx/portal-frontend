import StageHeader from 'components/shared/frame/StageHeader'
import { useTranslation } from 'react-i18next'

export default function Help() {
  const { t } = useTranslation('footer', { keyPrefix: 'help' })

  const general = () => (
    <section>
      <h3>{t('general.title')}</h3>
      <ul>
        {['what', 'goal', 'Contract Term Change'].map((topic) => (
          <li key={topic}>
            <p>{t(`general.${topic}.question`)}</p>
            <p>{t(`general.${topic}.answer`)}</p>
          </li>
        ))}
      </ul>
    </section>
  )

  return (
    <main>
      <StageHeader title={t('title')} />
      {general()}
    </main>
  )
}
