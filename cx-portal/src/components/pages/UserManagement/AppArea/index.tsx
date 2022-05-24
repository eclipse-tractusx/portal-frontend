import { Card, Carousel } from 'cx-portal-shared-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchSubscribed } from 'features/apps/marketplace/actions'
import { subscribedSelector } from 'features/apps/marketplace/slice'
import uniqueId from 'lodash/uniqueId'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'

export const AppArea = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const items = useSelector(subscribedSelector)

  useEffect(() => {
    dispatch(fetchSubscribed(true))
  }, [dispatch])

  return (
    <section>
      <div className="app-user-details-header-title">
        <SubHeaderTitle
          title="content.usermanagement.apparea.headline"
          variant="h3"
        />
      </div>
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
                navigate(`/usermanagement/appuserdetails/${item.id}`)
              }}
            />
          )
        })}
      </Carousel>
    </section>
  )
}
