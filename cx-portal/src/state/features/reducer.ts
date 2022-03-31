import { combineReducers } from 'redux'
import appsSlice from 'state/features/apps/apps'
import userSlice from 'state/features/user/userSlice'
import partnerNetworkSlice from 'state/features/partnerNetwork/partnerNetworkSlice'
import userAdministrationSlice from './userAdministration/userAdministrationSlice'
import appMarketplaceSlice from './appMarketplace/appMarketplaceSlice'

const rootReducer = combineReducers({
  apps: appsSlice.reducer,
  user: userSlice,
  partnerNetwork: partnerNetworkSlice.reducer,
  userAdministration: userAdministrationSlice.reducer,
  appMarketplace: appMarketplaceSlice.reducer,
})

export default rootReducer
