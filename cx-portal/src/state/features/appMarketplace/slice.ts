import { CardItems } from 'cx-portal-shared-components'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'state/store'
import { fetchItems } from './actions'
import { AppMarketplaceState } from './types'
import { appToCard } from './mapper'

const initialState: AppMarketplaceState = {
  items: [],
  loading: true,
  error: '',
}

const appMarketplaceSlice = createSlice({
  name: 'appMarketplace',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.items = []
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchItems.fulfilled, (state, { payload }) => {
      state.items = payload || []
      state.loading = false
      state.error = ''
    })
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.items = []
      state.loading = false
      state.error = action.error.message as string
    })
  },
})

export const appMarketplaceSelector = (state: RootState): AppMarketplaceState =>
  state.appMarketplace

export const appMarketplaceSelectCards = (state: RootState): CardItems[] =>
  state.appMarketplace.items.map((app) => appToCard(app))

export default appMarketplaceSlice
