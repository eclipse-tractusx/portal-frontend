import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { initialPaginResult, initServicetNotifications, RequestState } from 'types/MainTypes'
import { PageNotificationsProps } from 'cx-portal-shared-components'
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
  reducers: {
    setNotification: (state, { payload }) => ({
      ...state,
      notification: payload.notification
    }),
    resetNotification: (state) => ({
      ...state,
      notification: initServicetNotifications
    }),
  },
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

export const notificationSelector = (state: RootState): PageNotificationsProps =>
  state.admin.service.notification

const Slice = { slice }

export default Slice
