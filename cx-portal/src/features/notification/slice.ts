import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { initServicetNotifications } from 'types/MainTypes'
import { PageNotificationsProps } from 'cx-portal-shared-components'
import { initialState, name } from './types'

export const notificationSlice = createSlice({
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
})

export const notificationSelector = (state: RootState): PageNotificationsProps =>
  state.notification.notification

export default notificationSlice
