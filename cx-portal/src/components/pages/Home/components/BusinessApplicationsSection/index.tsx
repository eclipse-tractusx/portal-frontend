import { useTranslation } from 'react-i18next'
import { Typography, Carousel, Card } from 'cx-portal-shared-components'
import uniqueId from 'lodash/uniqueId'
import { useEffect, useRef } from 'react'
import PageService from 'services/PageService'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  AppMarketplaceApp,
  useFetchActiveAppsQuery,
} from 'features/apps/apiSlice'
import { activeItemsSelector } from 'features/apps/subscribed/slice'
import { fetchItems } from 'features/apps/subscribed/actions'
import { appToCard } from 'features/apps/mapper'

export const label = 'BusinessApplictions'

export default function BusinessApplicationsSection() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data } = useFetchActiveAppsQuery()
  const cards = (data || []).map((app: AppMarketplaceApp) => appToCard(app))
  const subscribed = useSelector(activeItemsSelector)

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

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
