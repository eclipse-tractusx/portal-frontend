import { InitialListState, ListState } from 'types/MainTypes'

export const name = 'info/search'

export enum SearchCategory {
  APP = 'APP',
  BP = 'BP',
}

export type SearchItem = {
  id: string
  category: SearchCategory
  title: string
  description?: string
}

export const initialState: ListState<SearchItem> = { ...InitialListState }
