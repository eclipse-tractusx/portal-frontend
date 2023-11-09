/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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
import {
  NOTIFICATION_TOPIC,
  type NotificationType,
  type CXNotification,
  type CXNotificationMeta,
  type NotificationFetchType,
} from './types'

export interface NotificationArgsProps {
  sorting: string
  notificationTopic: string
}

export interface NotificationReadType {
  id: string
  flag: boolean
}

export const apiSlice = createApi({
  reducerPath: 'info/notifications',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    getNotificationCount: builder.query<number, boolean>({
      query: (read) => `/api/notification/count?isRead=${read}`,
    }),
    getNotificationMeta: builder.query<CXNotificationMeta, null>({
      query: () => '/api/notification/count-details',
    }),
    getNotifications: builder.query<CXNotification, NotificationFetchType>({
      query: (fetchArgs) => `/api/notification?page=${fetchArgs.page}&size=${fetchArgs.size}${
        fetchArgs?.args?.sorting ? `&sorting=${fetchArgs.args.sorting}` : ''
      }${
        (fetchArgs?.args?.notificationTopic && fetchArgs?.args?.notificationTopic !== NOTIFICATION_TOPIC.ALL) ? `&notificationTopicId=${fetchArgs?.args?.notificationTopic}` : ''
      }${
        fetchArgs?.args?.notificationTypeIds?.map((typeId: NotificationType) => `&searchTypeIds=${typeId}`).join('') ?? ''
      }`,
      // configuration for an individual endpoint, overriding the api setting
      keepUnusedDataFor: 10,
    }),
    setNotificationRead: builder.mutation<void, NotificationReadType>({
      query: (obj) => ({
        url: `/api/notification/${obj.id}/read?isRead=${obj.flag}`,
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
