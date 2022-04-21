import { useTranslation } from 'react-i18next'
import { Carousel, Typography, Card } from 'cx-portal-shared-components'
import { Box } from '@mui/system'
import { uniqueId } from 'lodash'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function BusinessApplicationsSection() {
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

  const items = [item, item, item, item, item, item, item, item] // TODO: Replace from api

  return (
    <div className="orange-background">
      <section className="business-applications-section">
        <Typography
          sx={{ fontFamily: 'LibreFranklin-Light' }}
          variant="h3"
          className="section-title"
        >
          {t('content.dashboard.businessApplicationsSection.title')}
        </Typography>
        <Carousel slidesToShow={4}>
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
