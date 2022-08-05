import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import userSlice from './user/slice'
import partnerNetworkSlice from './partnerNetwork/slice'
import twinsSlice from './digitalTwins/slice'
import connectorSlice from './connector/slice'
import notificationSlice from './notification/slice'
import ErrorSlice from './error/slice'
import { reducer as admin } from './admin/reducer'
import { reducer as apps } from './apps/reducer'
import { reducer as control } from './control/reducer'
import { reducer as info } from './info/reducer'
import modelsSlice from './semanticModels/slice'
import { apiSlice as userApiSlice } from './admin/userApiSlice'
import { apiSlice as serviceApiSlice } from './admin/serviceApiSlice'
import { apiSlice as notificationApiSlice } from './notification/apiSlice'
import { apiSlice as appRolesSlice } from './admin/appuserApiSlice'
import { apiSlice as appMarketplaceSlice } from './apps/apiSlice'

export const reducers = {
  admin,
  apps,
  control,
  info,
  semanticModels: modelsSlice.reducer,
  user: userSlice,
  twins: twinsSlice.reducer,
  partnerNetwork: partnerNetworkSlice.reducer,
  connector: connectorSlice.reducer,
  notification: notificationSlice.reducer,
  error: ErrorSlice.reducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [serviceApiSlice.reducerPath]: serviceApiSlice.reducer,
  [notificationApiSlice.reducerPath]: notificationApiSlice.reducer,
  [appRolesSlice.reducerPath]: appRolesSlice.reducer,
  [appMarketplaceSlice.reducerPath]: appMarketplaceSlice.reducer,
}

export const store = configureStore({
  reducer: combineReducers(reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApiSlice.middleware)
      .concat(serviceApiSlice.middleware)
      .concat(notificationApiSlice.middleware)
      .concat(appRolesSlice.middleware)
      .concat(appMarketplaceSlice.middleware),
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type { RootState, AppDispatch }
