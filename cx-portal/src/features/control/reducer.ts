import { combineReducers } from 'redux'
import { slice as overlay } from './overlay/slice'
import { slice as update } from './updatesSlice'

export const reducer = combineReducers({
  overlay: overlay.reducer,
  update: update.reducer,
})

const Reducer = { reducer }

export default Reducer
