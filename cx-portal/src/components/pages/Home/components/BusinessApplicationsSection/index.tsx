import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Carousel, Card } from 'cx-portal-shared-components'
import uniqueId from 'lodash/uniqueId'
import PageService from 'services/PageService'
import { appToCard } from 'features/apps/mapper'
import {
  AppMarketplaceApp,
  SubscriptionStatus,
  SubscriptionStatusItem,
  useFetchActiveAppsQuery,
  useFetchSubscriptionStatusQuery,
} from 'features/apps/apiSlice'

export const label = 'BusinessApplictions'

export default function BusinessApplicationsSection() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const active = useFetchActiveAppsQuery().data || []
  const cards = active.map((app: AppMarketplaceApp) => appToCard(app))
  const subscriptions = useFetchSubscriptionStatusQuery().data || []
  const subscribed = subscriptions
    .filter(
      (item: SubscriptionStatusItem) =>
        item.appSubscriptionStatus === SubscriptionStatus.ACTIVE
    )
    .map((item: SubscriptionStatusItem) => item.appId)
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
          {cards.map((item) =>
            item.id && subscribed.includes(item.id) ? (
              <Card
                {...item}
                key={uniqueId(item.title)}
                buttonText="Details"
                imageSize="small"
                imageShape="round"
                variant="minimal"
                expandOnHover={false}
                filledBackground={true}
                onClick={() => item.id && navigate(`/appdetail/${item.id}`)}
              />
            ) : null
          )}
        </Carousel>
      </section>
    </div>
  )
}
