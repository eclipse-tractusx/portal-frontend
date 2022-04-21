import { useTranslation } from 'react-i18next'
import { Carousel, Typography, Card } from 'cx-portal-shared-components'
import { Box } from '@mui/system'
import { uniqueId } from 'lodash'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function BusinessApplicationsSection() {
  const { t } = useTranslation()

  const items = [
    {
      title: 'Dismantler App',
      subtitle: 'SAP',
      image: {
        src: 'https://hackernoon.com/hn-images/1*ruk9c2uz62aEdb8Nm5PWHw.jpeg',
        alt: 'Catena-X AppCard',
      },
      rating: 4.5,
      price: 'free to use',
      description: 'Quick and transparent overview of reusable car components.',
      onClick: () => {
        document.location.href =
          'https://catenax-dt-rec.authentication.eu10.hana.ondemand.com/login'
      },
    },
    {
      title: 'Dismantler App',
      subtitle: 'SAP',
      image: {
        src: 'https://hackernoon.com/hn-images/1*ruk9c2uz62aEdb8Nm5PWHw.jpeg',
        alt: 'Catena-X AppCard',
      },
      rating: 4.5,
      price: 'free to use',
      description: 'Quick and transparent overview of reusable car components.',
      onClick: () => {
        document.location.href =
          'https://catenax-dt-rec.authentication.eu10.hana.ondemand.com/login'
      },
    },
    {
      title: 'Covanto - AFQM',
      subtitle: 'BOSCH',
      image: {
        src: 'https://laszeray.com/wp-content/uploads/2019/08/laszeray-2-740x450.jpg',
        alt: 'Catena-X AppCard',
      },
      rating: 4.5,
      price: 'free to use',
      description: 'Quality Traceability.',
      onClick: () => {
        document.location.href = 'https://portal-staging.afqm-services.com/'
      },
    },
    {
      title: 'Fraud Dashboard',
      subtitle: 'Catena-X',
      image: {
        src: 'https://blog.hubspot.de/hubfs/Germany/Blog_images/GettyImages-840201636.jpeg',
        alt: 'Catena-X AppCard',
      },
      rating: 4.5,
      price: 'free to use',
      description: 'Fraud Dashboard.',
      onClick: () => {
        document.location.href = 'https://dash.catenax-cdq.com/'
      },
    },
    {
      title: 'Dismantler App',
      subtitle: 'SAP',
      image: {
        src: 'https://hackernoon.com/hn-images/1*ruk9c2uz62aEdb8Nm5PWHw.jpeg',
        alt: 'Catena-X AppCard',
      },
      rating: 4.5,
      price: 'free to use',
      description: 'Quick and transparent overview of reusable car components.',
      onClick: () => {
        document.location.href =
          'https://catenax-dt-rec.authentication.eu10.hana.ondemand.com/login'
      },
    },
  ]
  return (
    <div className="orange-background">
      <section className="business-applications-section">
        <Typography
          sx={{ fontFamily: 'LibreFranklin-Light' }}
          variant="h3"
          className="section-title"
        >
          {t('content.home.businessApplicationsSection.title')}
        </Typography>
        <Carousel slidesToShow={4} dots={true}>
          {items?.map((item) => (
            <Box sx={{ padding: '28px' }} key={uniqueId('carousel-item')}>
              <Card
                buttonText="Details"
                imageSize="small"
                imageShape="round"
                variant="minimal"
                filledBackground={true}
                title={item.title}
                subtitle={item.subtitle}
                image={item.image}
              />
            </Box>
          ))}
        </Carousel>
      </section>
    </div>
  )
}
