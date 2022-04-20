import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'state/store'
import { fetchItem } from './actions'
import { AppDetailsState } from './types'

const initialState: AppDetailsState = {
  item: null,
  loading: true,
  error: '',
}

const appDetailsSlice = createSlice({
  name: 'appDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItem.pending, (state) => {
      state.item = null
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchItem.fulfilled, (state, { payload }) => {
      state.item = payload || {}
      state.loading = false
      state.error = ''
    })
    builder.addCase(fetchItem.rejected, (state, action) => {
      state.item = null
      state.loading = false
      state.error = action.error.message as string
    })
  },
})

export const appDetailsSelector = (state: RootState): AppDetailsState => state.appDetails

export default appDetailsSlice
