import { Card, CardItems, Carousel } from 'cx-portal-shared-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  fetchActive,
  fetchSubscriptionStatus,
} from 'features/apps/marketplace/actions'
import {
  activeSelector,
  subscribedStatusSelector,
  subscribedAppsSelector,
} from 'features/apps/marketplace/slice'
import uniqueId from 'lodash/uniqueId'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'

export const AppArea = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const items = useSelector(activeSelector)
  const appsStatus = useSelector(subscribedStatusSelector)
  const apps = useSelector(subscribedAppsSelector)
  console.log('items', items)
  console.log('appsStatus', appsStatus)
  console.log('apps', apps)

  useEffect(() => {
    dispatch(fetchSubscriptionStatus())
    dispatch(fetchActive())
  }, [dispatch])

  return (
    <section id="access-management-id">
      <div className="app-user-details-header-title">
        <SubHeaderTitle
          title="content.usermanagement.apparea.headline"
          variant="h3"
        />
      </div>
      <Carousel gapToDots={5}>
        {items.map((item: CardItems) => {
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
              onClick={() => {
                navigate(`/usermanagement/appuserdetails/${item.id}`)
              }}
            />
          )
        })}
      </Carousel>
    </section>
  )
}
