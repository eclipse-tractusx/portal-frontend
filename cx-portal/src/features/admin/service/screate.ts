import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { AsyncState, RequestState } from 'types/MainTypes'
import { addItem } from './actions'
import { name } from './types'

const initialState: AsyncState = {
  request: RequestState.NONE,
  error: '',
}

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    setAddItem: (state, action) => ({
      ...state,
      data: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(addItem.pending, (state) => ({
      ...state,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(addItem.fulfilled, (state) => ({
      ...state,
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(addItem.rejected, (state, action) => ({
      ...state,
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
  },
})

export const stateSelector = (state: RootState): AsyncState =>
  state.admin.service.create

const Slice = { slice }

export default Slice
