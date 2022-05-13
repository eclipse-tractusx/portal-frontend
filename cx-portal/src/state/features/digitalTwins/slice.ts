import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'state/store'
import { fetchDigitalTwins, fetchTwinById } from './actions'
import { DigitalTwinsInitialState, ShellDescriptor, TwinList } from './types'

const defaultTwins: TwinList = {
  items: [],
  totalItems: 0,
  itemCount: 0,
  currentPage: 0,
  totalPages: 0,
}

const initialState: DigitalTwinsInitialState = {
  twinList: defaultTwins,
  twin: null,
  loading: false,
  error: '',
}

const twinsSlice = createSlice({
  name: 'twins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDigitalTwins.pending, (state) => {
      state.twinList = defaultTwins
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchDigitalTwins.fulfilled, (state, { payload }) => {
      state.twinList = payload as TwinList
      state.loading = false
      state.error = ''
    })
    builder.addCase(fetchDigitalTwins.rejected, (state, action) => {
      state.twinList = defaultTwins
      state.loading = false
      state.error = action.error.message as string
    })
    builder.addCase(fetchTwinById.pending, (state) => {
      state.twin = null
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchTwinById.fulfilled, (state, { payload }) => {
      state.twin = payload as ShellDescriptor
      state.loading = false
      state.error = ''
    })
    builder.addCase(fetchTwinById.rejected, (state, action) => {
      state.twin = null
      state.loading = false
      state.error = action.error.message as string
    })
  },
})

export const twinsSelector = (state: RootState): DigitalTwinsInitialState =>
  state.twins

export default twinsSlice
