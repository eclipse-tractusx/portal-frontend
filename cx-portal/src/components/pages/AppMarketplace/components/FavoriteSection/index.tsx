import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'cx-portal-shared-components'
import FavoriteItem from './FavoriteItem'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import { fetchFavorites } from 'state/features/appMarketplace/actions'
import { appMarketplaceSelectFavorites } from 'state/features/appMarketplace/slice'

export default function FavoriteSection() {
  const dispatch = useDispatch()
  const items = useSelector(appMarketplaceSelectFavorites)

  useEffect(() => {
    dispatch(fetchFavorites())
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
        {items &&
          items.map((item) => {
            return <FavoriteItem item={item} />
          })}
      </Carousel>
    </section>
  )
}
