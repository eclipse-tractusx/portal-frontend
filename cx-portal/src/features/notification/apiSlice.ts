import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import UserService from 'services/UserService'
import { CXNotification } from './types'

export const apiSlice = createApi({
  reducerPath: 'info/notifications',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://portal.dev.demo.catena-x.net/assets/api/notification', //getApiBase(),
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${UserService.getToken()}`)
      return headers
    },
  }),
  endpoints: builder => ({
    getCount: builder.query<number, null>({
      query: () => '/count.json'
    }),
    getNotifications: builder.query<CXNotification[], null>({
      query: () => '/all.json'
    })
  })
})

export const { useGetCountQuery, useGetNotificationsQuery } = apiSlice