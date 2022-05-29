import { combineReducers } from 'redux'
import { slice as licenses } from './licenses/slice'
import { slice as news } from './news/slice'
import { slice as search } from './search/slice'

export const reducer = combineReducers({
  licenses: licenses.reducer,
  news: news.reducer,
  search: search.reducer,
})

const Reducer = { reducer }

export default Reducer
