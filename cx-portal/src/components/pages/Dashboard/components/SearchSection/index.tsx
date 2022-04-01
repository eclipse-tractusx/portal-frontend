import { useTranslation } from 'react-i18next'
import { SearchInput } from 'cx-portal-shared-components'
import './search-section.scss'

export default function SearchSection() {
  const { t } = useTranslation()

  return (
    <div className="search-section">
      <div className="search-input-wrapper">
        <SearchInput
          placeholder={t('content.dashboard.searchSection.inputPlaceholder')}
        />
      </div>
    </div>
  )
}
