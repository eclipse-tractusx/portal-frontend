import { combineReducers } from 'redux'
import userSlice from './user/slice'
import partnerNetworkSlice from './partnerNetwork/slice'
import newsSlice from './news/slice'
import twinsSlice from './digitalTwins/slice'
import licensesSlice from './licenses/slice'
import connectorSlice from './connector/slice'
import { reducer as admin } from './admin/reducer'
import { reducer as apps } from './apps/reducer'

export const reducers = {
  admin,
  apps,
  user: userSlice,
  news: newsSlice.reducer,
  twins: twinsSlice.reducer,
  licenses: licensesSlice.reducer,
  partnerNetwork: partnerNetworkSlice.reducer,
  connector: connectorSlice.reducer,
}

const rootReducer = combineReducers(reducers)

export default rootReducer
