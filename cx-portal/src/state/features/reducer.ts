import { combineReducers } from 'redux'
import userSlice from './user/slice'
import partnerNetworkSlice from './partnerNetwork/slice'
import userAdministrationSlice from './userAdministration/slice'
import appDetailsSlice from './appDetails/slice'
import appMarketplaceSlice from './appMarketplace/slice'
import newsSlice from './news/slice'
import twinsSlice from './digitalTwins/slice'
import licensesSlice from './licenses/slice'

// Reducers need separate export for testing library
export const reducers = {
  //apps: appsSlice.reducer,
  user: userSlice,
  news: newsSlice.reducer,
  twins: twinsSlice.reducer,
  licenses: licensesSlice.reducer,
  partnerNetwork: partnerNetworkSlice.reducer,
  appDetails: appDetailsSlice.reducer,
  appMarketplace: appMarketplaceSlice.reducer,
  userAdministration: userAdministrationSlice.reducer,
}

const rootReducer = combineReducers(reducers)

export default rootReducer
