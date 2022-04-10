import { Cards, CategoryDivider } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export const AppListGroup = ({
  category,
  items,
}: {
  category: string
  items: any[]
}) => {
  const { t } = useTranslation()
  const [itemsShown, setItemsShown] = useState('4')

  const itemsToShow = items.slice(0, Number(itemsShown))

  const increaseItemsShown = () => {
    setItemsShown((prevState) => {
      return (Number(prevState) + 4).toString()
    })
  }

  return (
    <>
      <CategoryDivider
        buttonText={t('global.actions.more')}
        categoryItemsLength={items.length}
        categoryName={t(
          'content.appstore.appOverviewSection.categories.' +
            category.replace(/\s+/g, '').toLowerCase()
        )}
        disabled={itemsToShow.length >= items.length}
        onButtonClick={increaseItemsShown}
      />
      <Cards
        buttonText={t('global.actions.details')}
        columns={4}
        imageShape={'round'}
        imageSize={'small'}
        items={itemsToShow}
        variant={'compact'}
      />
    </>
  )
}
