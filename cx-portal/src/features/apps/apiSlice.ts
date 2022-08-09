/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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
import i18next from 'i18next'
import { getAssetBase } from 'services/EnvironmentService'
import { apiBaseQuery } from 'utils/rtkUtil'

export type AppMarketplaceApp = {
  id: string
  title: string
  provider: string
  leadPictureUri: string
  shortDescription: string
  useCases: string[]
  price: string
  rating?: number
  link?: string
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
}

export type SubscriptionStatusItem = {
  appId: string
  appSubscriptionStatus: SubscriptionStatus
}

export type AppDetails = AppMarketplaceApp & {
  providerUri: string
  contactEmail: string
  contactNumber: string
  detailPictureUris: string[]
  longDescription: string
  isSubscribed: string
  tags: string[]
  languages: string[]
}

export type AppDetailsState = {
  item: AppDetails
  loading: boolean
  error: string
}

export const apiSlice = createApi({
  reducerPath: 'rtk/apps/marketplace',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    fetchAppDetails: builder.query<AppDetails, string>({
      query: (id: string) => `/api/apps/${id}?lang=${i18next.language}`,
    }),
    fetchActiveApps: builder.query<AppMarketplaceApp[], void>({
      query: () => `/api/apps/active`,
    }),
    fetchFavoriteApps: builder.query<string[], void>({
      query: () => `/api/apps/favourites`,
    }),
    fetchLatestApps: builder.query<AppMarketplaceApp[], void>({
      query: () => `${getAssetBase()}/api/apps/latest.json`,
    }),
    fetchSubscriptionStatus: builder.query<SubscriptionStatusItem[], void>({
      query: () => `/api/apps/subscribed/subscription-status`,
    }),
  }),
})

export const {
  useFetchAppDetailsQuery,
  useFetchActiveAppsQuery,
  useFetchFavoriteAppsQuery,
  useFetchLatestAppsQuery,
  useFetchSubscriptionStatusQuery,
} = apiSlice
