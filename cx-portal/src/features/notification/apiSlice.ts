import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiBaseQuery } from 'utils/rtkUtil'
import { CXNotification } from './types'

export const apiSlice = createApi({
  reducerPath: 'info/notifications',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    getNotificationCount: builder.query<number, boolean>({
      query: (read) => `/api/notification/count?read=${read}`,
    }),
    getNotifications: builder.query<CXNotification[], null>({
      query: () => '/api/notification',
    }),
    setNotificationRead: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/notification/${id}/read`,
        method: 'PUT',
      }),
    }),
  }),
})

export const {
  useGetNotificationCountQuery,
  useGetNotificationsQuery,
  useSetNotificationReadMutation,
} = apiSlice
