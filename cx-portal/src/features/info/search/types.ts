import { SearchItem } from 'cx-portal-shared-components'
import { InitialListState, ListState } from 'types/MainTypes'

export const name = 'info/search'

export enum SearchCategory {
  APP = 'APP',
  NEWS = 'NEWS',
  USER = 'USER',
  PARTNER = 'PARTNER',
}

export const initialState: ListState<SearchItem> = { ...InitialListState }
