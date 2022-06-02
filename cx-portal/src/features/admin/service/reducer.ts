import { combineReducers } from 'redux'
import { slice as list } from './slist'
import { slice as detail } from './sdetail'
import { slice as create } from './screate'
import { slice as remove } from './sremove'

export const reducer = combineReducers({
  list: list.reducer,
  detail: detail.reducer,
  create: create.reducer,
  remove: remove.reducer,
})

const Reducer = { reducer }

export default Reducer
