import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'state/store'
import { AppMarketplaceInitialState } from 'types/appMarketplace/AppMarketplaceTypes'
import { fetchApps } from './appMarketplaceActions'

const initialState: AppMarketplaceInitialState = {
  apps: [],
  loading: true,
  error: '',
}

const appMarketplaceSlice = createSlice({
  name: 'appMarketplace',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchApps.pending, (state) => {
      state.apps = []
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchApps.fulfilled, (state, { payload }) => {
      state.apps = payload || []
      state.loading = false
      state.error = ''
    })
    builder.addCase(fetchApps.rejected, (state, action) => {
      state.apps = []
      state.loading = false
      state.error = action.error.message as string
    })
  },
})

export const selectorAppMarketplace = (
  state: RootState
): AppMarketplaceInitialState => state.appMarketplace
export default appMarketplaceSlice
