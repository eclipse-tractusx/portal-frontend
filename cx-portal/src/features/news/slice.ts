import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { fetchItems } from './actions'
import { NewsInitialState } from './types'

const initialState: NewsInitialState = {
  items: [],
  loading: true,
  error: '',
}

const newsSlice = createSlice({
  name: 'news',
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

export const newsSelector = (state: RootState): NewsInitialState => state.news

export default newsSlice
