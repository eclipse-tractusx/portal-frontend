/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiBaseQuery } from 'utils/rtkUtil'
import { CXNotification, CXNotificationMeta } from './types'
interface FetchArgs {
  page: number
  size: number
  args?: any
}
export interface NotificationArgsProps {
  sorting: string
  notificationTopic: string
}

export const apiSlice = createApi({
  reducerPath: 'info/notifications',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    getNotificationCount: builder.query<number, boolean>({
      query: (read) => `/api/notification/count?isRead=${read}`,
    }),
    getNotificationMeta: builder.query<CXNotificationMeta, null>({
      query: () => `/api/notification/count-details`,
    }),
    getNotifications: builder.query<CXNotification, FetchArgs>({
      query: (fetchArgs) => {
        let base = `/api/notification?page=${fetchArgs.page}&size=${fetchArgs.size}`
        if (fetchArgs.args.sorting) {
          base += `&sorting=${fetchArgs.args.sorting}`
        }
        if (
          fetchArgs.args.notificationTopic &&
          fetchArgs.args.notificationTopic !== 'ALL'
        ) {
          base += `&notificationTopic=${fetchArgs.args.notificationTopic}`
        }
        if (
          fetchArgs.args.notificationTopic &&
          fetchArgs.args.notificationTopic === 'ACTION'
        ) {
          base += `&onlyDueDate=true`
        }
        return base
      },
    }),
    setNotificationRead: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/notification/${id}/read`,
        method: 'PUT',
      }),
    }),
    deleteNotification: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/notification/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetNotificationCountQuery,
  useGetNotificationsQuery,
  useSetNotificationReadMutation,
  useDeleteNotificationMutation,
  useGetNotificationMetaQuery,
} = apiSlice
