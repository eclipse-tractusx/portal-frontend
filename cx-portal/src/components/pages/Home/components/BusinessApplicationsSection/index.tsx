import { useTranslation } from 'react-i18next'
import { Cards, Typography } from 'cx-portal-shared-components'

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
        document.location.href = 'https://apps.cdq.com/signin/catenax'
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
        document.location.href = 'dash.catenax-cdq.com'
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

        <Cards
          items={items} // TODO: Replace from api
          columns={4}
          buttonText="Details"
          imageSize="small"
          imageShape="round"
          variant="minimal"
          expandOnHover={false}
          filledBackground={true}
        />
      </section>
    </div>
  )
}
