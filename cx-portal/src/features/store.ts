import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import userSlice from './user/slice'
import partnerNetworkSlice from './partnerNetwork/slice'
import twinsSlice from './digitalTwins/slice'
import connectorSlice from './connector/slice'
import { reducer as admin } from './admin/reducer'
import { reducer as apps } from './apps/reducer'
import { reducer as info } from './info/reducer'

export const reducers = {
  admin,
  apps,
  info,
  user: userSlice,
  twins: twinsSlice.reducer,
  partnerNetwork: partnerNetworkSlice.reducer,
  connector: connectorSlice.reducer,
}

export const store = configureStore({
  reducer: combineReducers(reducers),
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type { RootState, AppDispatch }
