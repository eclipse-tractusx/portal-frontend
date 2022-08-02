import { useTranslation } from 'react-i18next'
import { Typography, Carousel, Card } from 'cx-portal-shared-components'
import uniqueId from 'lodash/uniqueId'
import { useEffect, useRef } from 'react'
import PageService from 'services/PageService'
import { useDispatch, useSelector } from 'react-redux'
import { activeSelector } from 'features/apps/marketplaceDeprecated/slice'
import { fetchActive } from 'features/apps/marketplaceDeprecated/actions'

export const label = 'BusinessApplictions'

export default function BusinessApplicationsSection() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const items = useSelector(activeSelector)

  useEffect(() => {
    dispatch(fetchActive())
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
          {items.map((item) => {
            return (
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
            )
          })}
        </Carousel>
      </section>
    </div>
  )
}
