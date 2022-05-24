import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { fetchItems } from './actions'
import { LicensesState } from './types'

const initialState: LicensesState = {
  items: null,
  loading: true,
  error: '',
}

const licensesSlice = createSlice({
  name: 'licenses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.items = null
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchItems.fulfilled, (state, { payload }) => {
      state.items = payload || []
      state.loading = false
      state.error = ''
    })
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.items = null
      state.loading = false
      state.error = action.error.message as string
    })
  },
})

export const licensesSelector = (state: RootState): LicensesState =>
  state.licenses

export default licensesSlice
