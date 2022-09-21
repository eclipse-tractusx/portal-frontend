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

import { CardItems } from 'cx-portal-shared-components'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { fetchActive, fetchLatest, fetchSubscriptionStatus } from './actions'
import {
  AppMarketplaceApp,
  AppMarketplaceState,
  initialState,
  name,
  SubscribedApps,
} from './types'
import { appToCard } from '../mapper'

export const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchActive.pending, (state) => ({
      ...state,
      items: [],
      loading: true,
      error: '',
    }))
    builder.addCase(fetchActive.fulfilled, (state, { payload }) => ({
      ...state,
      items: payload || [],
      loading: false,
      error: '',
    }))
    builder.addCase(fetchActive.rejected, (state, action) => ({
      ...state,
      items: [],
      loading: false,
      error: action.error.message as string,
    }))
    builder.addCase(fetchLatest.pending, (state) => ({
      ...state,
      latest: [],
      loading: true,
      error: '',
    }))
    builder.addCase(fetchLatest.fulfilled, (state, { payload }) => ({
      ...state,
      latest: payload || [],
      loading: false,
      error: '',
    }))
    builder.addCase(fetchLatest.rejected, (state, action) => ({
      ...state,
      latest: [],
      loading: false,
      error: action.error.message as string,
    }))
    builder.addCase(fetchSubscriptionStatus.pending, (state) => ({
      ...state,
      subscribedApps: [],
      loading: true,
      error: '',
    }))
    builder.addCase(
      fetchSubscriptionStatus.fulfilled,
      (state, { payload }) => ({
        ...state,
        subscribedApps: payload || [],
        loading: false,
        error: '',
      })
    )
    builder.addCase(fetchSubscriptionStatus.rejected, (state, action) => ({
      ...state,
      subscribedApps: [],
      loading: false,
      error: action.error.message as string,
    }))
  },
})

export const stateSelector = (state: RootState): AppMarketplaceState =>
  state.apps.marketplace

export const activeSelector = (state: RootState): CardItems[] =>
  state.apps.marketplace.items.map((app: AppMarketplaceApp) => appToCard(app))

export const latestSelector = (state: RootState): CardItems[] =>
  state.apps.marketplace.latest.map((app: AppMarketplaceApp) => appToCard(app))

export const subscribedStatusSelector = (state: RootState) =>
  state.apps.marketplace.subscribedApps

export const subscribedAppsSelector = (state: RootState) =>
  state.apps.marketplace.items
    .filter((item: AppMarketplaceApp) => {
      return state.apps.marketplace.subscribedApps.find(
        (app: SubscribedApps) => {
          return (
            item['id'] === app['appId'] &&
            app['appSubscriptionStatus'] === 'ACTIVE'
          )
        }
      )
    })
    .forEach((result: AppMarketplaceApp) => {
      console.log('result', appToCard(result))
      return appToCard(result)
    })

const Slice = { slice }

export default Slice
