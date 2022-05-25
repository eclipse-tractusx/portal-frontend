import { combineReducers } from 'redux'
import { slice as approle } from './approle/slice'
import { slice as registration } from './registration/slice'
import { slice as user } from './user/slice'

export const reducer = combineReducers({
  approle: approle.reducer,
  registration: registration.reducer,
  user: user.reducer,
})

const Reducer = { reducer }

export default Reducer
