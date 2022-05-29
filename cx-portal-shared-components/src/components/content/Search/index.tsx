export enum SearchCategory {
  APP = 'APP',
  NEWS = 'NEWS',
  USER = 'USER',
  PARTNER = 'PARTNER',
}

export type SearchItem = {
  id: string
  category: SearchCategory
  title: string
  description?: string
}
