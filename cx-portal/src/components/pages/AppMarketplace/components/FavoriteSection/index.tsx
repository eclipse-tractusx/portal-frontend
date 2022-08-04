import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CarouselBox } from 'cx-portal-shared-components'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import FavoriteItem from './FavoriteItem'
import { activeSelector } from 'features/apps/marketplace/slice'
import { fetchItems } from 'features/apps/favorites/actions'
import { itemsSelector as favoriteSelector } from 'features/apps/favorites/slice'
import EmptyFavorites from './EmptyFavorites'

export default function FavoriteSection() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const active = useSelector(activeSelector)
  const favorites = useSelector(favoriteSelector)
  const favoriteSectionPosition = favorites.length === 0 ? 30 : 45

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '100px',
        right: `${favoriteSectionPosition}px !important`,
      }}
    >
      {favorites.length <= 0 ? (
        <EmptyFavorites />
      ) : (
        <CarouselBox
          title={t('content.appstore.favoriteSection.myFavorite')}
          itemWidth={266}
          itemHeight={225}
          backgroundColor={'rgba(255, 255, 255, 0.2)'}
          hasBorder={false}
        >
          {active
            .filter((item) => favorites.includes(item.id!))
            .map((item) => (
              <FavoriteItem
                key={item.id}
                item={item}
                expandOnHover={false}
                cardClick={true}
              />
            ))}
        </CarouselBox>
      )}
    </Box>
  )
}
