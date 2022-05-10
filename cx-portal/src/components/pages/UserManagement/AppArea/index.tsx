import { Card, Carousel, Typography } from 'cx-portal-shared-components'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchSubscribed } from 'state/features/appMarketplace/actions'
import { appMarketplaceSelectSubscribed } from 'state/features/appMarketplace/slice'
import uniqueId from 'lodash/uniqueId'

export const AppArea = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const items = useSelector(appMarketplaceSelectSubscribed)

  useEffect(() => {
    dispatch(fetchSubscribed(true))
  }, [dispatch])

  return (
    <section>
      <Typography variant="h3" className="section-title">
        {t('content.usermanagement.apparea.headline')}
      </Typography>
      <Carousel gapToDots={5}>
        {items.map((item) => {
          return (
            <Card
              key={uniqueId(item.title)}
              title={item.title}
              subtitle={item.subtitle}
              image={item.image}
              buttonText="Details"
              imageSize="small"
              imageShape="round"
              variant="minimal"
              expandOnHover={false}
              filledBackground={true}
              onClick={() => {
                navigate(`/usermanagement/appuserdetails/${'demo'}`)
              }}
            />
          )
        })}
      </Carousel>
    </section>
  )
}
