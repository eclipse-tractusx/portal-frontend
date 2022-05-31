import { combineReducers } from 'redux'
import { slice as overlay } from './overlay/slice'

export const reducer = combineReducers({
  overlay: overlay.reducer,
})

const Reducer = { reducer }

export default Reducer
