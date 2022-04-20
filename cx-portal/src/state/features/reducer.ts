import { combineReducers } from 'redux'
import appsSlice from 'state/features/apps/apps'
import userSlice from 'state/features/user/userSlice'
import partnerNetworkSlice from 'state/features/partnerNetwork/partnerNetworkSlice'
import userAdministrationSlice from 'state/features/userAdministration/userAdministrationSlice'
import appMarketplaceSlice from 'state/features/appMarketplace/appMarketplaceSlice'
import newsSlice from './news/slice'
import appDetailsSlice from './appDetails/slice'
import licensesSlice from './licenses/slice'

// Reducers need separate export for testing library
export const reducers = {
  apps: appsSlice.reducer,
  appDetails: appDetailsSlice.reducer,
  user: userSlice,
  news: newsSlice.reducer,
  licenses: licensesSlice.reducer,
  partnerNetwork: partnerNetworkSlice.reducer,
  appMarketplace: appMarketplaceSlice.reducer,
  userAdministration: userAdministrationSlice.reducer,
}

const rootReducer = combineReducers(reducers)

export default rootReducer
