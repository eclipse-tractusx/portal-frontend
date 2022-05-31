import { createSlice } from '@reduxjs/toolkit'
import { name, initialState, OwnUser } from './types'
import { fetch } from './actions'
import { RootState } from 'features/store'
import { RequestState } from 'types/MainTypes'

export const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetch.pending, (state) => ({
      ...state,
      data: null,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetch.fulfilled, (state, { payload }) => ({
      ...state,
      data: payload || [],
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(fetch.rejected, (state, action) => ({
      ...state,
      data: null,
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
  },
})

export const ownUserSelector = (state: RootState): OwnUser | null =>
  state.admin.userOwn.data

const Slice = { slice }

export default Slice
