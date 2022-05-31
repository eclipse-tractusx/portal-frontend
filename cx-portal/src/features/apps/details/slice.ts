import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { fetch } from './actions'
import {
  AppDetailInitial,
  AppDetails,
  AppDetailsState,
  initialState,
  name,
} from './types'

export const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetch.pending, (state) => {
      state.item = AppDetailInitial
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetch.fulfilled, (state, { payload }) => {
      state.item = payload || {}
      state.loading = false
      state.error = ''
    })
    builder.addCase(fetch.rejected, (state, action) => {
      state.item = AppDetailInitial
      state.loading = false
      state.error = action.error.message as string
    })
  },
})

export const stateSelector = (state: RootState): AppDetailsState =>
  state.apps.details

export const itemSelector = (state: RootState): AppDetails =>
  state.apps.details.item

const Slice = { slice }

export default Slice
