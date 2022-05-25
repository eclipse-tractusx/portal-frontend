import { useSelector } from 'react-redux'
import { searchSelector } from 'features/info/search/slice'
import './search-result-section.scss'

export default function SearchSection() {
  const searchItems = useSelector(searchSelector)

  return searchItems.length > 0 ? (
    <div className="search-result-section">
      <ul>
        {searchItems.map((item, i) => (
          <li key={i}>
            {item.category} - {item.title}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <></>
  )
}
