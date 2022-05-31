import { CardItems } from 'cx-portal-shared-components'
import { InitialListState, ListState } from 'types/MainTypes'

export const name = 'info/news'

export const initialState: ListState<CardItems> = { ...InitialListState }
