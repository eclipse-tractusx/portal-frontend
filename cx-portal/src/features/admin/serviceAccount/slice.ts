import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { initialPaginResult, RequestState } from 'types/MainTypes'
import { fetchPage } from './actions'
import {
  initialState,
  name,
  ServiceAccount,
  ServiceAccountState,
} from './types'

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

export const stateSelector = (state: RootState): ServiceAccountState =>
  state.admin.service

export const itemsSelector = (state: RootState): ServiceAccount[] =>
  state.admin.service.data.content

const Slice = { slice }

export default Slice
