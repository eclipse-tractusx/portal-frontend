import { useTranslation } from 'react-i18next'
import { CategoryDivider, CfxGrid } from '@cofinity-x/shared-components'
import { useResponsiveItems } from 'hooks/useResponsiveItems'
import { AppCardWithImage } from '../AppCardWithImage'
import type { AppMarketplaceCard } from 'features/apps/types'

export const AppListGroup = ({
  category,
  items,
}: {
  category: string
  items: AppMarketplaceCard[]
}) => {
  const { t } = useTranslation()
  const { itemsShown, handleToggleItems, getResponsiveItemsCount } =
    useResponsiveItems([items])
  const itemsToShow = items.slice(0, Number(itemsShown))
  const currentResponsiveCount = getResponsiveItemsCount(window.innerWidth)

  return (
    <>
      <CategoryDivider
        buttonText={
          items.length <= currentResponsiveCount ||
          itemsToShow.length < items.length
            ? t('global.actions.more')
            : t('global.actions.collapse')
        }
        categoryItemsLength={items.length}
        categoryName={t(
          'content.appstore.appOverviewSection.categories.' +
            category.replace(/\s+/g, '').toLowerCase()
        )}
        disabled={items.length <= currentResponsiveCount}
        onButtonClick={() => {
          handleToggleItems(itemsToShow, items)
        }}
      />
      <CfxGrid data-testid="app-list-group" container spacing={3}>
        {itemsToShow.map((item) => (
          <CfxGrid key={item.id} size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}>
            <AppCardWithImage item={item} />
          </CfxGrid>
        ))}
      </CfxGrid>
    </>
  )
}
