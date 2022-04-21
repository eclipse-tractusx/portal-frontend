import { combineReducers } from 'redux'
import userSlice from 'state/features/user/slice'
import partnerNetworkSlice from 'state/features/partnerNetwork/slice'
import userAdministrationSlice from 'state/features/userAdministration/slice'
import appMarketplaceSlice from 'state/features/appMarketplace/slice'
import newsSlice from './news/slice'
import licensesSlice from './licenses/slice'

// Reducers need separate export for testing library
export const reducers = {
  user: userSlice,
  news: newsSlice.reducer,
  licenses: licensesSlice.reducer,
  partnerNetwork: partnerNetworkSlice.reducer,
  appMarketplace: appMarketplaceSlice.reducer,
  userAdministration: userAdministrationSlice.reducer,
}

const rootReducer = combineReducers(reducers)

export default rootReducer
