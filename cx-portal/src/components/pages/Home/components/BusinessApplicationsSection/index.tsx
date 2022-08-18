import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Carousel, Card } from 'cx-portal-shared-components'
import uniqueId from 'lodash/uniqueId'
import PageService from 'services/PageService'
import { appToCard } from 'features/apps/mapper'
import { AppMarketplaceApp } from 'features/apps/apiSlice'
import { useFetchSubscribedAppsQuery } from 'features/apps/apiSliceTest'

export const label = 'BusinessApplictions'

export default function BusinessApplicationsSection() {
  const { t } = useTranslation()
  const subscribed = useFetchSubscribedAppsQuery().data || []
  const cards = subscribed.map((app: AppMarketplaceApp) => appToCard(app))
  const reference = PageService.registerReference(label, useRef(null))

  return (
    <div ref={reference} className="orange-background">
      <section className="business-applications-section">
        <Typography
          sx={{
            fontFamily: 'LibreFranklin-Light',
            marginBottom: '48px !important',
          }}
          variant="h3"
          className="section-title"
        >
          {t('content.home.businessApplicationsSection.title')}
        </Typography>

        <Carousel gapToDots={5}>
          {cards.map((item) => (
            <Card
              {...item}
              key={uniqueId(item.title)}
              buttonText="Details"
              imageSize="small"
              imageShape="round"
              variant="minimal"
              expandOnHover={false}
              filledBackground={true}
              onClick={item.onClick}
            />
          ))}
        </Carousel>
      </section>
    </div>
  )
}
