import { SearchCategory, SearchItem } from '.'
import { Menu } from '../../basic/Menu'

export const SearchResult = ({ items }: { items: SearchItem[] }) => {
  return (
    <Menu
      items={items.map((item) => ({
        href: `/${
          item.category === SearchCategory.APP ? 'appdetail' : 'partnerdetail'
        }/${item.id}`,
        title: `${item.category} | ${item.title}`,
      }))}
    />
  )
}
