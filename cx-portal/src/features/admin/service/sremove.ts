import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { AsyncState, RequestState } from 'types/MainTypes'
import { removeItem } from './actions'
import { name } from './types'

const initialState: AsyncState = {
  request: RequestState.NONE,
  error: '',
}

export const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(removeItem.pending, (state) => ({
      ...state,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(removeItem.fulfilled, (state) => ({
      ...state,
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(removeItem.rejected, (state, action) => ({
      ...state,
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
  },
})

export const stateSelector = (state: RootState): AsyncState =>
  state.admin.service.remove

const Slice = { slice }

export default Slice
