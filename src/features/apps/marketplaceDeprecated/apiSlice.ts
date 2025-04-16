/********************************************************************************
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
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
import type { SubscribedApps, AppMarketplaceApp } from './types'
import { apiBaseQuery } from 'utils/rtkUtil'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    getActive: builder.query<AppMarketplaceApp[], void>({
      query: () => ({
        url: '/api/apps/active',
      }),
    }),
    getLatest: builder.query<AppMarketplaceApp[], void>({
      query: () => ({
        url: '/api/apps/latest',
      }),
    }),
    getSubscriptionStatus: builder.query<SubscribedApps[], void>({
      query: () => ({
        url: '/api/Apps/subscribed/subscription-status',
      }),
    }),
  }),
})

export const {
  useGetActiveQuery,
  useGetLatestQuery,
  useGetSubscriptionStatusQuery,
} = apiSlice
