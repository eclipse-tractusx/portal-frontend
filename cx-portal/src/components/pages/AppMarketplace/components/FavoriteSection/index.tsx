import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'cx-portal-shared-components'
import FavoriteItem from './FavoriteItem'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import { activeSelector } from 'features/apps/marketplace/slice'
import { fetchItems } from 'features/apps/favorites/actions'
import { itemsSelector as favoriteSelector } from 'features/apps/favorites/slice'

export default function FavoriteSection() {
  const dispatch = useDispatch()
  const active = useSelector(activeSelector)
  const favorites = useSelector(favoriteSelector)

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  return (
    <section className="favorite-section">
      <div className="favorite-section-title">
        <SubHeaderTitle
          title={'content.appstore.favoriteSection.title'}
          variant="h3"
        />
      </div>
      <Carousel gapToDots={115} expandOnHover={true}>
        {active
          .filter((item) => favorites.includes(item.id!))
          .map((item) => {
            return (
              <FavoriteItem
                key={item.id}
                item={item}
                expandOnHover={true}
                cardClick={false}
              />
            )
          })}
      </Carousel>
    </section>
  )
}
