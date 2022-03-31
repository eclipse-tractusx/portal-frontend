import { AppCards, Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'

export const AppArea = () => {
  const { t } = useTranslation()

  // TODO: Replace from api
  const item = {
    title: 'Digital Twin Aspect Debugger',
    subtitle: 'Catena-X',
    image: {
      src: 'https://images.unsplash.com/photo-1517153295259-74eb0b416cee?auto=format&fit=crop&w=640&q=420',
      alt: 'Catena-X AppCard',
    },
    description: 'Lorem Ipsum is simply dummy text of the printing.',
    onButtonClick: () => {},
  }

  return (
    <section>
      <Typography variant="h3" className="section-title">
        {t('content.usermanagement.apparea.headline')}
      </Typography>
      <AppCards
        items={[item, item, item, item]} // TODO: Replace from api
        columns={4}
        buttonText="Details"
        imageSize="small"
        imageShape="round"
      />
    </section>
  )
}
