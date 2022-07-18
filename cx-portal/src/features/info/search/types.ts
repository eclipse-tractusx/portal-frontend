import { InitialListState, ListState } from 'types/MainTypes'

export const name = 'info/search'

export enum SearchCategory {
  APP = 'APP',
  NEWS = 'NEWS',
  PAGE = 'PAGE',
  OVERLAY = 'OVERLAY',
  ACTION = 'ACTION',
  USECASE = 'USECASE',
  USER = 'USER',
  PARTNER = 'PARTNER',
}

export type SearchItem = {
  id: string
  category: SearchCategory
  title: string
  description?: string
}

export interface SearchState extends ListState<SearchItem> {
  expr: string
}

export const initialState: SearchState = { ...InitialListState, expr: '' }
