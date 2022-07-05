import { Menu } from 'cx-portal-shared-components'
import { show } from 'features/control/overlay/actions'
import { Overlay } from 'features/control/overlay/types'
import { SearchCategory, SearchItem } from 'features/info/search/types'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <Menu
      items={items.map((item) => ({
        title: `${item.category} | ${t(item.title)}`,
        onClick: () =>
          item.category === SearchCategory.PAGE
            ? navigate(`/${item.id}`)
            : dispatch(show(getCategoryOverlay(item.category), item.id)),
      }))}
    />
  )
}
