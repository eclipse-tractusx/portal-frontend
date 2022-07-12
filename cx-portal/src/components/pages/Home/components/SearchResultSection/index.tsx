import { useSelector } from 'react-redux'
import {
  searchExprSelector,
  searchItemSelector,
} from 'features/info/search/slice'
import { SearchResult } from 'components/shared/basic/SearchResult'
import './search-result-section.scss'

export default function SearchResultSection() {
  const searchExpr = useSelector(searchExprSelector)
  const searchItems = useSelector(searchItemSelector)

  return searchItems.length > 0 ? (
    <div className="search-result-section">
      <SearchResult expr={searchExpr} items={searchItems} />
    </div>
  ) : (
    <></>
  )
}
