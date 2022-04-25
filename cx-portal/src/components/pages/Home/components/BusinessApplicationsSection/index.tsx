import { useTranslation } from 'react-i18next'
import { Carousel, Typography, Cards } from 'cx-portal-shared-components'
import { Box } from '@mui/system'
import { uniqueId } from 'lodash'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function BusinessApplicationsSection() {
  const { t } = useTranslation()

  const items = [
    {
      title: 'Fraud Prevention Report',
      subtitle: 'Catena-X',
      image: {
        src: 'https://americourses.com/wp-content/uploads/2020/07/fraud-prevention.jpg',
        alt: 'Catena-X AppCard',
      },
      rating: 4.5,
      price: 'free to use',
      description: 'Fraud Detection App to report Fraud Cases.',
      onClick: () => {
        document.location.href =
          'https://apps.cdq.com/signin/00c9f5bf?redirectUri=https://apps.cdq.com/dashboard/fraud/report-fraud'
      },
    },
  ]

  const items1 = [
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

  const items2 = [
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
  ]

  const items3 = [
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
  ]

  const items4 = [
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

  const items5 = [
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
        <Carousel itemWidth={266} itemHeight={279} gapBetweenSlides={32} gapToDots={10}>
          <Cards
            items={items} // TODO: Replace from api
            columns={1}
            buttonText="Details"
            imageSize="small"
            imageShape="round"
            variant="minimal"
            expandOnHover={false}
            filledBackground={true}
          />
          <Cards
            items={items1} // TODO: Replace from api
            columns={1}
            buttonText="Details"
            imageSize="small"
            imageShape="round"
            variant="minimal"
            expandOnHover={false}
            filledBackground={true}
          />
          <Cards
            items={items2} // TODO: Replace from api
            columns={1}
            buttonText="Details"
            imageSize="small"
            imageShape="round"
            variant="minimal"
            expandOnHover={false}
            filledBackground={true}
          />
          <Cards
            items={items3} // TODO: Replace from api
            columns={1}
            buttonText="Details"
            imageSize="small"
            imageShape="round"
            variant="minimal"
            expandOnHover={false}
            filledBackground={true}
          />
          <Cards
            items={items4} // TODO: Replace from api
            columns={1}
            buttonText="Details"
            imageSize="small"
            imageShape="round"
            variant="minimal"
            expandOnHover={false}
            filledBackground={true}
          />
          <Cards
            items={items5} // TODO: Replace from api
            columns={1}
            buttonText="Details"
            imageSize="small"
            imageShape="round"
            variant="minimal"
            expandOnHover={false}
            filledBackground={true}
          />
        </Carousel>
      </section>
    </div>
  )
}
