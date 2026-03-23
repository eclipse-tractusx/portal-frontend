/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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

import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'features/store'
import { initServicetNotifications, initialPaginMeta } from 'types/MainTypes'
import type {
  PageNotificationsProps,
  PaginMeta,
} from '@arena2036/portal-shared-components-construct-x'
import {
  type NotificationFetchType,
  type NOTIFICATION_TOPIC,
  type NotificationSortingType,
  initialState,
  name,
} from './types'
import I18nService from 'services/I18nService'

export const slice = createSlice({
  name: `${name}/control`,
  initialState,
  reducers: {
    setNotification: (state, { payload }) => ({
      ...state,
      notification: payload.notification,
    }),
    resetNotification: (state) => ({
      ...state,
      notification: initServicetNotifications,
    }),
    setFetch: (state, { payload }) => ({
      ...state,
      fetch: payload.initialNotificationState,
    }),
    setMeta: (state, action: PayloadAction<PaginMeta>) => ({
      ...state,
      meta: action.payload,
    }),
    setPage: (state, action: PayloadAction<number>) => ({
      ...state,
      fetch: {
        ...state.fetch,
        page: action.payload,
      },
    }),
    setOrder: (state, action: PayloadAction<NotificationSortingType>) => ({
      ...state,
      fetch: {
        ...state.fetch,
        page: 0,
        args: {
          ...state.fetch.args,
          sorting: action.payload,
        },
      },
    }),
    setSearch: (state, action: PayloadAction<string>) => ({
      ...state,
      fetch: {
        ...state.fetch,
        page: 0,
        args: {
          ...state.fetch.args,
          searchQuery: action.payload,
          searchTypeIds: I18nService.searchNotifications(action.payload),
        },
      },
    }),
    setTopic: (state, action: PayloadAction<NOTIFICATION_TOPIC>) => ({
      ...state,
      fetch: {
        ...state.fetch,
        page: 0,
        args: {
          ...state.fetch.args,
          notificationTopic: action.payload,
        },
      },
    }),
  },
})

export const metaSelector = (state: RootState): PaginMeta =>
  state.notification.meta ?? initialPaginMeta

export const notificationSelector = (
  state: RootState
): PageNotificationsProps => state.notification.notification

export const notificationFetchSelector = (
  state: RootState
): NotificationFetchType => state.notification.fetch

export const {
  setNotification,
  resetNotification,
  setMeta,
  setFetch,
  setTopic,
  setSearch,
  setOrder,
  setPage,
} = slice.actions

export default slice
