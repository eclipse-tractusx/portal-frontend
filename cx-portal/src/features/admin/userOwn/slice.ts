import { createSlice } from '@reduxjs/toolkit'
import {
  name,
  initialState,
  AdminUserDetailState,
  UserDetail,
  InitialUserDetail,
} from './types'
import {
  fetchAny,
  fetchOwn,
  putBusinessPartnerNumber,
  putResetPassword,
} from './actions'
import { RootState } from 'features/store'
import { RequestState } from 'types/MainTypes'

const pending = (state: AdminUserDetailState) => ({
  ...state,
  data: InitialUserDetail,
  request: RequestState.SUBMIT,
  error: '',
})

const fulfilled = (
  state: AdminUserDetailState,
  { payload }: { payload: UserDetail }
) => ({
  ...state,
  data: payload || [],
  request: RequestState.OK,
  error: '',
})

const rejected = (state: AdminUserDetailState, action: { error: any }) => ({
  ...state,
  data: InitialUserDetail,
  request: RequestState.ERROR,
  error: action.error.message as string,
})

export const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOwn.pending, pending)
    builder.addCase(fetchOwn.fulfilled, fulfilled)
    builder.addCase(fetchOwn.rejected, rejected)

    builder.addCase(fetchAny.pending, pending)
    builder.addCase(fetchAny.fulfilled, fulfilled)
    builder.addCase(fetchAny.rejected, rejected)

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

    builder.addCase(putBusinessPartnerNumber.pending, (state) => ({
      ...state,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(putBusinessPartnerNumber.fulfilled, (state) => ({
      ...state,
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(putBusinessPartnerNumber.rejected, (state, action) => ({
      ...state,
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
  },
})

export const UserdetailSelector = (state: RootState): UserDetail =>
  state.admin.userOwn.data

export const resetSelector = (state: RootState): any => state.admin.userOwn

const Slice = { slice }

export default Slice
