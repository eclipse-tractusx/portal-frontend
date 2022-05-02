import { CardItems } from 'cx-portal-shared-components'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'state/store'
import { fetchItems, fetchSubscribed } from './actions'
import { AppMarketplaceState } from './types'
import { appToCard } from './mapper'

const initialState: AppMarketplaceState = {
  items: [],
  subscribed: [],
  loading: true,
  error: '',
}

const appMarketplaceSlice = createSlice({
  name: 'appMarketplace',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => ({
      ...state,
      items: [],
      loading: true,
      error: '',
    }))
    builder.addCase(fetchItems.fulfilled, (state, { payload }) => ({
      ...state,
      items: payload || [],
      loading: false,
      error: '',
    }))
    builder.addCase(fetchItems.rejected, (state, action) => ({
      ...state,
      items: [],
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

export const appMarketplaceSelector = (state: RootState): AppMarketplaceState =>
  state.appMarketplace

export const appMarketplaceSelectActive = (state: RootState): CardItems[] =>
  state.appMarketplace.items.map((app) => appToCard(app))

export const appMarketplaceSelectSubscribed = (state: RootState): CardItems[] =>
  state.appMarketplace.subscribed.map((app) => appToCard(app))

export default appMarketplaceSlice
