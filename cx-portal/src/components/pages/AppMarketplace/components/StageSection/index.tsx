import { Button, MainHeader, CarouselBox } from 'cx-portal-shared-components'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PageService from 'services/PageService'
import { label as AppList } from '../AppListSection'
import { useSelector } from 'react-redux'
import { activeSelector } from 'features/apps/marketplace/slice'
import { itemsSelector as favoriteSelector } from 'features/apps/favorites/slice'
import FavoriteItem from '../FavoriteSection/FavoriteItem'
import EmptyFavorites from '../FavoriteSection/EmptyFavorites'

export default function SearchSection() {
  const { t } = useTranslation()
  const active = useSelector(activeSelector)
  const favorites = useSelector(favoriteSelector)
  const favoriteSectionPosition = favorites.length === 0 ? 30 : 45

  return (
    <div className="stage-app-store stage-section">
      <MainHeader
        title={t('content.appstore.stage.title')}
        subTitle={t('content.appstore.stage.subtitle')}
        headerHeight={731}
        subTitleWidth={787}
        background="LinearGradient1"
        imagePath="./app-store-stage-desktop.png"
      >
        <Button
          sx={{ margin: '40px 10px 0 0' }}
          onClick={() => PageService.scrollTo(AppList)}
        >
          {t('content.appstore.stage.appButton')}
        </Button>

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
      </MainHeader>
    </div>
  )
}
