import debounce from 'lodash.debounce'
import { useTranslation } from 'react-i18next'
import { SearchInput } from 'cx-portal-shared-components'
import { useState, useMemo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { clearSearch, fetchSearch } from 'features/info/search/actions'
import './search-section.scss'

export default function SearchSection() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [searchExpr, setSearchExpr] = useState<string>('')

  const debouncedSearch = useMemo(
    () =>
      debounce((expr: string) => {
        dispatch(expr ? fetchSearch(expr) : clearSearch())
      }, 400),
    [dispatch]
  )

  const doSearch = useCallback(
    (expr: string) => {
      setSearchExpr(expr)
      debouncedSearch(expr)
    },
    [debouncedSearch]
  )

  return (
    <div className="search-section">
      <SearchInput
        placeholder={t('content.home.searchSection.inputPlaceholder')}
        value={searchExpr}
        autoFocus={true}
        onChange={(e) => doSearch(e.target.value)}
      />
    </div>
  )
}
