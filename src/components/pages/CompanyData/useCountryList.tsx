import { useFetchCountryListQuery } from 'features/admin/userApiSlice'
import { useState, useEffect } from 'react'
import { globalLanaguage, type Country, type CountryListMap } from './types'

const useCountryList = (i18n: { language: string }) => {
  const [defaultCountry, setDefaultCountry] = useState<string>('')

  const { data: countryList } = useFetchCountryListQuery() as {
    data?: Country[]
  }
  const countryListMap: CountryListMap[] = countryList
    ? countryList.map((country) => {
        const englishName = country.countryName.find(
          (name) => name.language === 'en'
        )?.value

        return {
          label: englishName ?? '',
          code: country.alpha2Code,
        }
      })
    : []

  useEffect(() => {
    const index = i18n.language === globalLanaguage.GERMAN ? 0 : 1

    const country = countryListMap[index]
    setDefaultCountry(country?.code ?? '')
  }, [i18n.language, countryListMap])

  return { defaultCountry, countryListMap }
}

export default useCountryList
