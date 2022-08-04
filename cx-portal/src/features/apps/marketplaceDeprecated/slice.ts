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
