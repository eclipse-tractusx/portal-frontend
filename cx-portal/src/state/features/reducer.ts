import { combineReducers } from 'redux'
import appsSlice from 'state/features/apps/apps'
import userSlice from 'state/features/user/userSlice'
import partnerNetworkSlice from 'state/features/partnerNetwork/partnerNetworkSlice'
import userAdministrationSlice from 'state/features/userAdministration/userAdministrationSlice'
import appMarketplaceSlice from 'state/features/appMarketplace/appMarketplaceSlice'

// Reducers need separate export for testing library
export const reducers = {
  apps: appsSlice.reducer,
  user: userSlice,
  partnerNetwork: partnerNetworkSlice.reducer,
  appMarketplace: appMarketplaceSlice.reducer,
  userAdministration: userAdministrationSlice.reducer,
}

const rootReducer = combineReducers(reducers)

export default rootReducer
