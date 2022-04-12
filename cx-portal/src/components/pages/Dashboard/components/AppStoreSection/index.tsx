import { useTranslation } from 'react-i18next'
import { Cards, Button, Typography } from 'cx-portal-shared-components'
//import { useHistory } from "react-router-dom";
import './app-store-section.scss'

export default function AppStoreSection() {
  const { t } = useTranslation()
  //const history = useHistory();

  // TODO: Replace from api
  const items = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
  ]

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
        items={items} // TODO: Replace from api
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
        onClick={() => console.log('click') /*history.push("/appmarketplace")*/}
      >
        {t('pages.appmarketplace')}
      </Button>
    </section>
  )
}
