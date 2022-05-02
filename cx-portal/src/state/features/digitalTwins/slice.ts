import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'state/store'
import { fetchDigitalTwins } from './actions'
import { DigitalTwinsInitialState, TwinList } from './types'

const defaultTwins: TwinList = {
  items: [],
  totalItems: 0,
  itemCount: 0,
  currentPage: 0,
  totalPages: 0
}

const initialState: DigitalTwinsInitialState = {
  twins: defaultTwins,
  loading: false,
  error: '',
}

const twinsSlice = createSlice({
  name: 'twins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDigitalTwins.pending, (state) => {
      state.twins = defaultTwins
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchDigitalTwins.fulfilled, (state, { payload }) => {
      state.twins = payload as TwinList
      state.loading = false
      state.error = ''
    })
    builder.addCase(fetchDigitalTwins.rejected, (state, action) => {
      state.twins = defaultTwins
      state.loading = false
      state.error = action.error.message as string
    })
  },
})

export const twinsSelector = (state: RootState): DigitalTwinsInitialState =>
  state.twins

export default twinsSlice
