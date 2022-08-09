import { CarouselBox } from 'cx-portal-shared-components'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import FavoriteItem from './FavoriteItem'
import EmptyFavorites from './EmptyFavorites'
import {
  useFetchActiveAppsQuery,
  useFetchFavoriteAppsQuery,
} from 'features/apps/apiSlice'
import { appToCard } from 'features/apps/mapper'

export default function FavoriteSection() {
  const { t } = useTranslation()
  const active = useFetchActiveAppsQuery().data || []
  const favorites = useFetchFavoriteAppsQuery().data || []
  const favoriteSectionPosition = favorites.length === 0 ? 30 : 45

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
            .map((item) => appToCard(item))
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
