import { SearchInput } from 'cx-portal-shared-components'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import debounce from 'lodash.debounce'
import { useApiGet } from 'utils/useApiGet'

export default function ThirdPartyLicenses() {
  const { t } = useTranslation()
  const [filterExpr, setFilterExpr] = useState<string>('')
  const [filter, setFilter] = useState<RegExp>(/./)
  const { data } = useApiGet('third-party-licenses.txt')
  const debouncedFilter = useCallback(
    debounce((expr: string) => setFilter(new RegExp(expr, 'i')), 300),
    []
  )
  const doFilter = function (expr: string) {
    setFilterExpr(expr)
    debouncedFilter(expr)
  }

  return (
    <main>
      <h2>{t('pages.thirdpartylicenses')}</h2>
      <p>{t('content.thirdpartylicenses.message')}</p>
      <SearchInput
        margin="normal"
        autoFocus={true}
        value={filterExpr}
        onChange={(event) => doFilter(event.target.value)}
      />
      <ul>
        {data
          .split('\n')
          .filter((pkg: string) => filter.test(pkg))
          .map((pkg, i) => (
            <li key={i}>
              {pkg.split(',').map((value, i) =>
                i === 0 ? (
                  <a key={i} href={`https://www.npmjs.com/package/${value}`}>
                    {value}
                  </a>
                ) : (
                  <span key={i}> {value} </span>
                )
              )}
            </li>
          ))}
      </ul>
    </main>
  )
}
