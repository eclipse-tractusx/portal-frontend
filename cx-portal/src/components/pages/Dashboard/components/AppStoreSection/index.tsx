import { useTranslation } from 'react-i18next'
import { Cards, Button, Typography } from 'cx-portal-shared-components'
import './app-store-section.scss'

export default function AppStoreSection() {
  const { t } = useTranslation()

  // TODO: Replace from api
  const item = {
    title: 'Digital Twin Aspect Debugger',
    subtitle: 'Catena-X',
    image: {
      src: 'https://images.unsplash.com/photo-1517153295259-74eb0b416cee?auto=format&fit=crop&w=640&q=420',
      alt: 'Catena-X AppCard',
    },
    rating: 4.5,
    price: 'free to use',
    description: 'Lorem Ipsum is simply dummy text of the printing.',
    onButtonClick: () => {},
  }

  return (
    <section className="app-store-section">
      <Typography
        sx={{ fontFamily: 'LibreFranklin-Light' }}
        variant="h3"
        className="section-title"
      >
        {t('content.dashboard.appStoreSection.title')}
      </Typography>
      <Cards
        items={[item, item, item, item, item, item, item, item]} // TODO: Replace from api
        columns={4}
        buttonText="Details"
        imageSize="small"
        imageShape="round"
        variant="compact"
        expandOnHover={false}
        filledBackground={true}
      />
      <Button
        sx={{ margin: '100px auto 60px', display: 'block' }}
        onClick={() => console.log('click')}
      >
        {t('pages.appstore')}
      </Button>
    </section>
  )
}
