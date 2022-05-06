import { combineReducers } from 'redux'
import userSlice from './user/slice'
import partnerNetworkSlice from './partnerNetwork/slice'
import userAdministrationSlice from './userAdministration/slice'
import appDetailsSlice from './appDetails/slice'
import appMarketplaceSlice from './appMarketplace/slice'
import newsSlice from './news/slice'
import licensesSlice from './licenses/slice'
import connectorSlice from './connector/slice'

// Reducers need separate export for testing library
export const reducers = {
  user: userSlice,
  news: newsSlice.reducer,
  licenses: licensesSlice.reducer,
  partnerNetwork: partnerNetworkSlice.reducer,
  appDetails: appDetailsSlice.reducer,
  appMarketplace: appMarketplaceSlice.reducer,
  userAdministration: userAdministrationSlice.reducer,
  connector: connectorSlice.reducer,
}

const rootReducer = combineReducers(reducers)

export default rootReducer
