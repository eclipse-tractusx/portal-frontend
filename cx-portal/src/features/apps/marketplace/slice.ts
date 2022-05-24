import { CardItems } from 'cx-portal-shared-components'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { fetchActive, fetchLatest, fetchSubscribed } from './actions'
import { AppMarketplaceState, initialState, name } from './types'
import { appToCard } from './mapper'

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
    builder.addCase(fetchSubscribed.pending, (state) => ({
      ...state,
      subscribed: [],
      loading: true,
      error: '',
    }))
    builder.addCase(fetchSubscribed.fulfilled, (state, { payload }) => ({
      ...state,
      subscribed: payload || [],
      loading: false,
      error: '',
    }))
    builder.addCase(fetchSubscribed.rejected, (state, action) => ({
      ...state,
      subscribed: [],
      loading: false,
      error: action.error.message as string,
    }))
  },
})

export const stateSelector = (state: RootState): AppMarketplaceState =>
  state.apps.marketplace

export const activeSelector = (state: RootState): CardItems[] =>
  state.apps.marketplace.items.map((app) => appToCard(app))

export const latestSelector = (state: RootState): CardItems[] =>
  state.apps.marketplace.latest.map((app) => appToCard(app))

export const subscribedSelector = (state: RootState): CardItems[] =>
  state.apps.marketplace.subscribed.map((app) => appToCard(app))

const Slice = { slice }

export default Slice
