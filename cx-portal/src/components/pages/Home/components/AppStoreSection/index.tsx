import { useTranslation } from 'react-i18next'
import { Cards, Button, Typography, Carousel } from 'cx-portal-shared-components'
import { useNavigate } from 'react-router-dom'
import './app-store-section.scss'

export default function AppStoreSection() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // TODO: Replace from api
  const items = [
    {
      title: 'smart MOM',
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
      title: 'BPDM - Manage Customers',
      subtitle: 'Catena-X',
      image: {
        src: 'https://laszeray.com/wp-content/uploads/2019/08/laszeray-2-740x450.jpg',
        alt: 'Catena-X AppCard',
      },
      rating: 4.5,
      price: 'free to use',
      description: 'Lorem Ipsum is simply dummy text of the printing.',
      onButtonClick: () => {},
    },
    {
      title: 'Material Traceability',
      subtitle: 'Catena-X',
      image: {
        src: 'https://www.visiott.com/wp-content/uploads/2022/01/Traceability-EN-Banner.jpg',
        alt: 'Catena-X AppCard',
      },
      rating: 4.5,
      price: 'free to use',
      description: 'Lorem Ipsum is simply dummy text of the printing.',
      onButtonClick: () => {},
    },
    {
      title: 'CE Marketplace',
      subtitle: 'SAP',
      image: {
        src: 'https://laszeray.com/wp-content/uploads/2019/08/laszeray-2-740x450.jpg',
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
        {t('content.home.appStoreSection.title')}
      </Typography>

      <Carousel gapBetweenSlides={32} gapToDots={40} gapCarouselTop={0}>
        <Cards
          items={items} // TODO: Replace from api
          columns={1}
          buttonText="Details"
          imageSize="small"
          imageShape="round"
          variant="compact"
          expandOnHover={false}
          filledBackground={true}
        />

        <Cards
          items={items} // TODO: Replace from api
          columns={1}
          buttonText="Details"
          imageSize="small"
          imageShape="round"
          variant="compact"
          expandOnHover={false}
          filledBackground={true}
        />

        <Cards
          items={items} // TODO: Replace from api
          columns={1}
          buttonText="Details"
          imageSize="small"
          imageShape="round"
          variant="compact"
          expandOnHover={false}
          filledBackground={true}
        />

        <Cards
          items={items} // TODO: Replace from api
          columns={1}
          buttonText="Details"
          imageSize="small"
          imageShape="round"
          variant="compact"
          expandOnHover={false}
          filledBackground={true}
        />

        <Cards
          items={items} // TODO: Replace from api
          columns={1}
          buttonText="Details"
          imageSize="small"
          imageShape="round"
          variant="compact"
          expandOnHover={false}
          filledBackground={true}
        />
      </Carousel>

      <Button
        sx={{ margin: '100px auto 60px', display: 'block' }}
        onClick={() => navigate('/appmarketplace')}
      >
        {t('pages.appmarketplace')}
      </Button>
    </section>
  )
}
