/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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
import { LogoGrayData } from '@catena-x/portal-shared-components'
import i18next from 'i18next'
import { getApiBase } from 'services/EnvironmentService'
import { apiBaseQuery } from 'utils/rtkUtil'
import type {
  AppDetails,
  AppMarketplaceApp,
  SubscriptionStatusItem,
  SubscriptionStatusDuplicateItem,
  ActiveSubscriptionItem,
  ProvidedApps,
  DocumentRequestData,
  SubscriptionAppRequest,
  AgreementRequest,
  ActiveSubscription,
  ActiveSubscriptionDetails,
  FetchSubscriptionAppQueryType,
} from './types'

export const apiSlice = createApi({
  reducerPath: 'rtk/apps/marketplace',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    fetchAppDetails: builder.query<AppDetails, string>({
      query: (id: string) => `/api/apps/${id}?lang=${i18next.language}`,
    }),
    fetchActiveApps: builder.query<AppMarketplaceApp[], void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const activeApps = await fetchWithBQ('/api/apps/active')
        if (activeApps.error) return { error: activeApps.error }
        const data = activeApps.data as AppMarketplaceApp[]
        const subscriptionStatus = await fetchWithBQ(
          '/api/Apps/subscribed/subscriptions'
        )
        const subscriptionData =
          subscriptionStatus.data as SubscriptionStatusItem[]

        subscriptionData.forEach(
          (subscriptionItem: SubscriptionStatusDuplicateItem) => {
            subscriptionItem.offerSubscriptionStatus = subscriptionItem.status
            subscriptionItem.appId = subscriptionItem.offerId
          }
        )

        data.forEach((appItem: AppMarketplaceApp) => {
          subscriptionData.forEach(
            (subscriptionItem: SubscriptionStatusItem) => {
              if (appItem.id === subscriptionItem.offerId)
                appItem.subscriptionStatus = subscriptionItem.status
            }
          )
        })
        return { data }
      },
    }),
    fetchFavoriteApps: builder.query<string[], void>({
      query: () => '/api/apps/favourites',
    }),
    fetchSubscriptionStatus: builder.query<ActiveSubscriptionItem[], void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const subscriptionApps = await fetchWithBQ(
          '/api/Apps/subscribed/activesubscriptions'
        )
        if (subscriptionApps.error) return { error: subscriptionApps.error }
        const subscriptionData =
          subscriptionApps.data as ActiveSubscriptionItem[]

        subscriptionData.forEach((subscriptionItem: ActiveSubscriptionItem) => {
          subscriptionItem.image = {
            src: subscriptionItem.image
              ? `${getApiBase()}/api/apps/${
                  subscriptionItem.offerId
                  // eslint-disable-next-line
                }/appDocuments/${subscriptionItem.image}`
              : LogoGrayData,
          }
        })
        return { data: subscriptionData }
      },
    }),
    fetchProvidedApps: builder.query<ProvidedApps, void>({
      query: () => '/api/apps/provided',
    }),
    fetchBusinessApps: builder.query<AppMarketplaceApp[], void>({
      query: () => '/api/apps/business',
    }),
    fetchDocumentById: builder.mutation({
      query: (data: DocumentRequestData) => ({
        url: `/api/apps/${data.appId}/appDocuments/${data.documentId}`,
        responseHandler: async (response) => ({
          headers: response.headers,
          data: await response.blob(),
        }),
      }),
    }),
    addSubscribeApp: builder.mutation<void, SubscriptionAppRequest>({
      query: (data: SubscriptionAppRequest) => ({
        url: `/api/apps/${data.appId}/subscribe`,
        method: 'POST',
        body: data.body,
      }),
    }),
    fetchAgreements: builder.query<AgreementRequest[], string>({
      query: (appId) => `/api/apps/appAgreementData/${appId}`,
    }),
    deactivateApp: builder.mutation<void, string>({
      query: (appId) => ({
        url: `/api/apps/appChange/${appId}/deactivateApp`,
        method: 'PUT',
      }),
    }),
    fetchSubscribedActiveApps: builder.query<ActiveSubscription[], void>({
      query: () => '/api/apps/subscribed/activesubscriptions',
    }),
    fetchSubscriptionApp: builder.query<
      ActiveSubscriptionDetails,
      FetchSubscriptionAppQueryType
    >({
      query: (obj) =>
        `/api/apps/${obj.appId}/subscription/${obj.subscriptionId}/subscriber`,
    }),
    unsubscribeApp: builder.mutation<void, string>({
      query: (subscriptionId) => ({
        url: `/api/apps/${subscriptionId}/unsubscribe`,
        method: 'PUT',
      }),
    }),
  }),
})

export const {
  useFetchAppDetailsQuery,
  useFetchActiveAppsQuery,
  useFetchFavoriteAppsQuery,
  useFetchSubscriptionStatusQuery,
  useFetchProvidedAppsQuery,
  useFetchBusinessAppsQuery,
  useFetchDocumentByIdMutation,
  useAddSubscribeAppMutation,
  useFetchAgreementsQuery,
  useDeactivateAppMutation,
  useFetchSubscribedActiveAppsQuery,
  useFetchSubscriptionAppQuery,
  useUnsubscribeAppMutation,
} = apiSlice
