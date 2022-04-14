import { Cards, Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'

export const AppArea = () => {
  const { t } = useTranslation()

  // TODO: Replace from api
  const items = [
    {
      title: 'Fraud Prevention',
      subtitle: 'Catena-X',
      image: {
        src: 'https://americourses.com/wp-content/uploads/2020/07/fraud-prevention.jpg',
        alt: 'Catena-X AppCard',
      },
      rating: 4.5,
      price: 'free to use',
      description: 'Fraud Detection App to report Fraud Cases.',
      onClick: () => {
        console.log('click')
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
        console.log('click')
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
        console.log('click')
      },
    },
    {
      title: 'Component Performance',
      subtitle: 'Catena-X',
      image: {
        src: 'https://blog.hubspot.de/hubfs/Germany/Blog_images/GettyImages-840201636.jpeg',
        alt: 'Catena-X AppCard',
      },
      rating: 4.5,
      price: 'free to use',
      description: 'Component Performance validation.',
      onClick: () => {
        console.log('click')
      },
    },
  ]

  return (
    <section>
      <Typography variant="h3" className="section-title">
        {t('content.usermanagement.apparea.headline')}
      </Typography>
      <Cards
        items={items} // TODO: Replace from api
        columns={4}
        buttonText="Details"
        imageSize="small"
        imageShape="round"
        filledBackground={true}
      />
    </section>
  )
}
