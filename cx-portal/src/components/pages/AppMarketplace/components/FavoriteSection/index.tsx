import { useTranslation } from 'react-i18next'
import { Typography, Carousel, Card } from 'cx-portal-shared-components'
import uniqueId from 'lodash/uniqueId'
import { useNavigate } from 'react-router-dom'

export default function FavoriteSection() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const removeFromFavorites = (appId: string) => {
    console.error('TODO: remove app favorites logic.')
  }

  const items = [
    {
      title: 'smart MOM',
      subtitle: 'Catena-X',
      image: {
        src: 'https://images.unsplash.com/photo-1517153295259-74eb0b416cee?auto=format&fit=crop&w=640&q=420',
        alt: 'Catena-X AppCard',
      },
      rating: 2.5,
      price: 'free to use',
      description: 'Lorem Ipsum is simply dummy text of the printing.',
      onButtonClick: () => navigate(`/appdetail/${'demo'}`),
      onSecondaryButtonClick: () => removeFromFavorites,
    },
    {
      title: 'BPDM - Manage Customers',
      subtitle: 'Catena-X',
      image: {
        src: 'https://laszeray.com/wp-content/uploads/2019/08/laszeray-2-740x450.jpg',
        alt: 'Catena-X AppCard',
      },
      rating: 3,
      price: 'free to use',
      description: 'Lorem Ipsum is simply dummy text of the printing.',
      onButtonClick: () => navigate(`/appdetail/${'demo'}`),
      onSecondaryButtonClick: () => removeFromFavorites,
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
      onButtonClick: () => navigate(`/appdetail/${'demo'}`),
      onSecondaryButtonClick: () => removeFromFavorites,
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
      onButtonClick: () => navigate(`/appdetail/${'demo'}`),
      onSecondaryButtonClick: () => removeFromFavorites,
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
      onButtonClick: () => navigate(`/appdetail/${'demo'}`),
      onSecondaryButtonClick: () => removeFromFavorites,
    },
  ]

  return (
    <section className="business-applications-section">
      <Typography
        sx={{
          fontFamily: 'LibreFranklin-Light',
          marginBottom: '48px !important',
        }}
        variant="h3"
        className="section-title"
      >
        {t('content.appstore.favoriteSection.title')}
      </Typography>

      <Carousel gapToDots={115} expandOnHover={true}>
        {items.map((item) => {
          return (
            <Card
              key={uniqueId(item.title)}
              title={item.title}
              subtitle={item.subtitle}
              image={item.image}
              buttonText="Details"
              imageSize="small"
              imageShape="round"
              variant="compact"
              expandOnHover={true}
              filledBackground={true}
              backgroundColor="background.background11"
              rating={item.rating}
              price={item.price}
              onButtonClick={item.onButtonClick}
              onSecondaryButtonClick={item.onSecondaryButtonClick}
            />
          )
        })}
      </Carousel>
    </section>
  )
}
