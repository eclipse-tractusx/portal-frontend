export interface CountryName {
  language: string
  value: string
}

export interface Country {
  alpha2Code: string
  countryName: CountryName[]
}

export interface CountryListMap {
  label: string
  code: string
}
export enum globalLanaguage {
  ENGLISH = 'en',
  GERMAN = 'de',
}
