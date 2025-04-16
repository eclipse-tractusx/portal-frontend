/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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

import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'
import type { RootState } from 'features/store'
import { appToCard } from '../mapper'
import {
  initialState,
  type AppMarketplaceApp,
  type AppMarketplaceState,
  type SubscribedApps,
} from './types'

enum Status {
  ACTIVE = 'ACTIVE',
}

const slice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(apiSlice.endpoints.getActive.matchPending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addMatcher(
        apiSlice.endpoints.getActive.matchFulfilled,
        (state, action) => {
          state.loading = false
          state.items = action.payload || []
        }
      )
      .addMatcher(
        apiSlice.endpoints.getActive.matchRejected,
        (state, action) => {
          state.loading = false
          state.error = action.error.message!
        }
      )

    builder
      .addMatcher(apiSlice.endpoints.getLatest.matchPending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addMatcher(
        apiSlice.endpoints.getLatest.matchFulfilled,
        (state, action) => {
          state.loading = false
          state.latest = action.payload || []
        }
      )
      .addMatcher(
        apiSlice.endpoints.getLatest.matchRejected,
        (state, action) => {
          state.loading = false
          state.error = action.error.message!
        }
      )

    builder
      .addMatcher(
        apiSlice.endpoints.getSubscriptionStatus.matchPending,
        (state) => {
          state.loading = true
          state.error = ''
        }
      )
      .addMatcher(
        apiSlice.endpoints.getSubscriptionStatus.matchFulfilled,
        (state, action) => {
          state.loading = false
          state.subscribedApps = action.payload || []
        }
      )
      .addMatcher(
        apiSlice.endpoints.getSubscriptionStatus.matchRejected,
        (state, action) => {
          state.loading = false
          state.error = action.error.message!
        }
      )
  },
})

export const stateSelector = (state: RootState): AppMarketplaceState =>
  state.apps.marketplace

export const activeSelector = (state: RootState) =>
  state.apps.marketplace.items.map((app: AppMarketplaceApp) => appToCard(app))

export const latestSelector = (state: RootState) =>
  state.apps.marketplace.latest.map((app: AppMarketplaceApp) => appToCard(app))

export const subscribedStatusSelector = (state: RootState) =>
  state.apps.marketplace.subscribedApps

export const subscribedAppsSelector = (state: RootState) => {
  return state.apps.marketplace.items.filter((item: AppMarketplaceApp) => {
    return state.apps.marketplace.subscribedApps.find(
      (app: SubscribedApps) =>
        item.id === app.appId && app.appSubscriptionStatus === Status.ACTIVE
    )
  })
}

export default slice.reducer
