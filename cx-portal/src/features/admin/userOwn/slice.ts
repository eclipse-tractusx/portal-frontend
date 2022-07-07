import { createSlice } from '@reduxjs/toolkit'
import { name, initialState, OwnUser, InitialOwnUser } from './types'
import { fetchAny, fetchOwn, putResetPassword } from './actions'
import { RootState } from 'features/store'
import { RequestState } from 'types/MainTypes'

export const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOwn.pending, (state) => ({
      ...state,
      data: InitialOwnUser,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchOwn.fulfilled, (state, { payload }) => ({
      ...state,
      data: payload || [],
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(fetchOwn.rejected, (state, action) => ({
      ...state,
      data: InitialOwnUser,
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))

    builder.addCase(fetchAny.pending, (state) => ({
      ...state,
      data: InitialOwnUser,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchAny.fulfilled, (state, { payload }) => ({
      ...state,
      data: payload || [],
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(fetchAny.rejected, (state, action) => ({
      ...state,
      data: InitialOwnUser,
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))

    builder.addCase(putResetPassword.pending, (state) => ({
      ...state,
      resetStatus: null,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(putResetPassword.fulfilled, (state, { payload }) => ({
      ...state,
      resetStatus: payload,
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(putResetPassword.rejected, (state, action) => ({
      ...state,
      resetStatus: null,
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
  },
})

export const ownUserSelector = (state: RootState): OwnUser =>
  state.admin.userOwn.data

export const resetSelector = (state: RootState): any => state.admin.userOwn

const Slice = { slice }

export default Slice
