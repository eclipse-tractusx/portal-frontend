import { useSelector } from 'react-redux'
import { searchSelector } from 'features/info/search/slice'
import { SearchResult } from 'components/shared/basic/SearchResult'
import './search-result-section.scss'

export default function SearchResultSection() {
  const searchItems = useSelector(searchSelector)

  return searchItems.length > 0 ? (
    <div className="search-result-section">
      <SearchResult items={searchItems} />
    </div>
  ) : (
    <></>
  )
}
