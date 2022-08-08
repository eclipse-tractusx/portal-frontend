import { createSlice } from '@reduxjs/toolkit'
import { PaginResult } from 'cx-portal-shared-components'
import { RootState } from 'features/store'
import {
  AsyncDataState,
  initialPaginResult,
  RequestState,
} from 'types/MainTypes'
import { fetchPage } from './actions'
import { name, ServiceAccount } from './types'

const initialState: AsyncDataState<PaginResult<ServiceAccount>> = {
  data: initialPaginResult,
  request: RequestState.NONE,
  error: '',
}

export const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPage.pending, (state) => ({
      ...state,
      data: initialPaginResult,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchPage.fulfilled, (state, { payload }) => ({
      ...state,
      data: payload,
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(fetchPage.rejected, (state, action) => ({
      ...state,
      data: initialPaginResult,
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
  },
})

export const stateSelector = (
  state: RootState
): AsyncDataState<PaginResult<ServiceAccount>> => state.admin.service.list

export const itemsSelector = (state: RootState): ServiceAccount[] =>
  state.admin.service.list.data.content

const Slice = { slice }

export default Slice
