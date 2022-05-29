import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { initialState, name, OverlayState } from './types'

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    show: (_state, action) => ({
      ...action.payload,
    }),
  },
})

export const stateSelector = (state: RootState): OverlayState =>
  state.control.overlay

const Slice = { slice }

export default Slice
