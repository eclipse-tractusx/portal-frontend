import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { AsyncDataState, RequestState } from 'types/MainTypes'
import { fetchDetail } from './actions'
import { name, ServiceAccount, ServiceAccountDetail } from './types'

const initialState: AsyncDataState<ServiceAccountDetail | null> = {
  data: null,
  request: RequestState.NONE,
  error: '',
}

export const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDetail.pending, (state) => ({
      ...state,
      data: null,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchDetail.fulfilled, (state, { payload }) => ({
      ...state,
      data: payload,
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(fetchDetail.rejected, (state, action) => ({
      ...state,
      data: null,
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
  },
})

export const stateSelector = (
  state: RootState
): AsyncDataState<ServiceAccount | null> => state.admin.service.detail

export const dataSelector = (state: RootState): ServiceAccountDetail | null =>
  state.admin.service.detail.data

const Slice = { slice }

export default Slice
