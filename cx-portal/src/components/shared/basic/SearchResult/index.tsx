import { Menu } from 'cx-portal-shared-components'
import { show } from 'features/control/overlay/actions'
import { Overlay } from 'features/control/overlay/types'
import { SearchCategory, SearchItem } from 'features/info/search/types'
import { useDispatch } from 'react-redux'

export const getCategoryOverlay = (category: SearchCategory): Overlay => {
  switch (category) {
    case SearchCategory.APP:
      return Overlay.APP
    case SearchCategory.PARTNER:
      return Overlay.COMPANY
    case SearchCategory.USER:
      return Overlay.USER
    default:
      return Overlay.NONE
  }
}

export const SearchResult = ({ items }: { items: SearchItem[] }) => {
  const dispatch = useDispatch()
  return (
    <Menu
      items={items.map((item) => ({
        title: `${item.category} | ${item.title}`,
        onClick: () => {
          dispatch(show(getCategoryOverlay(item.category), item.id))
        },
      }))}
    />
  )
}
