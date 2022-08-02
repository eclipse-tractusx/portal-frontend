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
import { apiSlice as adminServiceApi } from './admin/service/apiSlice'
import { apiSlice as adminUserApi } from './admin/user/apiSlice'
import { apiSlice as adminUserAppApi } from './admin/user/app/apiSlice'
import { apiSlice as notificationApi } from './notification/apiSlice'

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
  [adminServiceApi.reducerPath]: adminServiceApi.reducer,
  [adminUserApi.reducerPath]: adminUserApi.reducer,
  [adminUserAppApi.reducerPath]: adminUserAppApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
}

export const store = configureStore({
  reducer: combineReducers(reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(adminServiceApi.middleware)
      .concat(adminUserApi.middleware)
      .concat(adminUserAppApi.middleware)
      .concat(notificationApi.middleware),
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type { RootState, AppDispatch }
