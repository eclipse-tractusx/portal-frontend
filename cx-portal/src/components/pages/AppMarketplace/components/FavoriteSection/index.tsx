import { useTranslation } from 'react-i18next'
import { Typography, Carousel, Card } from 'cx-portal-shared-components'
import uniqueId from 'lodash/uniqueId'

export default function FavoriteSection() {
  const { t } = useTranslation()

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

      <Carousel gapToDots={5}>
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
              variant="minimal"
              expandOnHover={false}
              filledBackground={true}
            />
          )
        })}
      </Carousel>
    </section>
  )
}
