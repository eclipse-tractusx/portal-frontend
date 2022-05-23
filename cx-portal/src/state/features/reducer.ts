import { combineReducers } from 'redux'
import userSlice from './user/slice'
import partnerNetworkSlice from './partnerNetwork/slice'
import appDetailsSlice from './appDetails/slice'
import appMarketplaceSlice from './appMarketplace/slice'
import newsSlice from './news/slice'
import twinsSlice from './digitalTwins/slice'
import licensesSlice from './licenses/slice'
import adminUserSlice from './adminUser/slice'
import adminRegistrationSlice from './adminRegistration/slice'
import connectorSlice from './connector/slice'
import adminAppRoleSlice from './adminAppRole/slice'

// Reducers need separate export for testing library
export const reducers = {
  adminAppRole: adminAppRoleSlice.reducer,
  adminUser: adminUserSlice.reducer,
  adminRegistration: adminRegistrationSlice.reducer,
  user: userSlice,
  news: newsSlice.reducer,
  twins: twinsSlice.reducer,
  licenses: licensesSlice.reducer,
  partnerNetwork: partnerNetworkSlice.reducer,
  appDetails: appDetailsSlice.reducer,
  appMarketplace: appMarketplaceSlice.reducer,
  connector: connectorSlice.reducer,
}

const rootReducer = combineReducers(reducers)

export default rootReducer
