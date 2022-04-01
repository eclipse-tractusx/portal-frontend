import { useTranslation } from 'react-i18next'
import { AppCards, Button } from 'cx-portal-shared-components'
import './news-section.scss'

export default function NewsSection() {
  const { t } = useTranslation()

  // TODO: Replace from api
  const item = {
    title: 'Digital Twin Aspect Debugger',
    image: {
      src: 'https://images.unsplash.com/photo-1517153295259-74eb0b416cee?auto=format&fit=crop&w=640&q=420',
      alt: 'Catena-X AppCard',
    },
    description:
      'Lorem Ipsum is simply dummy text of the printing. Lorem Ipsum is simply dummy text of the printing. Lorem Ipsum is simply dummy text of the printing. Lorem Ipsum is simply dummy text of the printing.',
    readMoreText: 'Read more',
    readMoreLink: '#',
  }

  return (
    <section className="news-section">
      <AppCards
        items={[item, item, item]} // TODO: Replace from api
        columns={3}
        buttonText="Details"
        imageSize="medium"
        imageShape="round"
        variant="text-only"
        expandOnHover={false}
      />
      <Button
        sx={{ margin: '200px auto 0', display: 'block' }}
        onClick={() => console.log('click')}
      >
        {t('pages.appstore')}
      </Button>
    </section>
  )
}
