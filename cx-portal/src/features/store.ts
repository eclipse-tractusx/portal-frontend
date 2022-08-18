/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

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
import { apiSlice as appMarketplaceSliceTest } from './apps/apiSliceTest'
import { apiSlice as appManagementSlice } from './appManagement/apiSlice'

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
  [appMarketplaceSliceTest.reducerPath]: appMarketplaceSliceTest.reducer,
  [appManagementSlice.reducerPath]: appManagementSlice.reducer,
}

export const store = configureStore({
  reducer: combineReducers(reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApiSlice.middleware)
      .concat(serviceApiSlice.middleware)
      .concat(notificationApiSlice.middleware)
      .concat(appRolesSlice.middleware)
      .concat(appMarketplaceSlice.middleware)
      .concat(appMarketplaceSliceTest.middleware)
      .concat(appManagementSlice.middleware),
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type { RootState, AppDispatch }
