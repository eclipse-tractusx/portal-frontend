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
import { apiBaseQuery } from 'utils/rtkUtil'

export type ImageType = {
  src: string
  alt?: string
}

export interface AppInfo {
  status: string
  id: string | undefined
  name: string | undefined
}

export type AppMarketplaceApp = {
  id: string
  title: string
  provider: string
  leadPictureUri: string
  shortDescription: string
  useCases: string[]
  price: string
  rating?: number
  uri?: string
  status?: SubscriptionStatus
  image?: ImageType
  name?: string
  lastChanged?: string
  timestamp?: number
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  INACTIVE = 'INACTIVE',
  IN_REVIEW = 'IN_REVIEW',
  CREATED = 'CREATED',
}

export enum SubscriptionStatusText {
  ACTIVE = 'Active',
  PENDING = 'Pending',
  INACTIVE = 'Inactive',
  IN_REVIEW = 'In Review',
  CREATED = 'In Progress',
}

export type SubscriptionStatusItem = {
  appId: string
  offerSubscriptionStatus: SubscriptionStatus
}

export type DocumentData = {
  documentId: string
  documentName: string
}

export type AppDetails = AppMarketplaceApp & {
  providerUri: string
  contactEmail: string
  contactNumber: string
  detailPictureUris: string[]
  documents: DocumentAppContract
  longDescription: string
  isSubscribed: string
  tags: string[]
  languages: string[]
  leadPictureUri?: ImageType
}

export type DocumentAppContract = {
  APP_CONTRACT: Array<DocumentData>
}

export type AppDetailsState = {
  item: AppDetails
  loading: boolean
  error: string
}

export type AgreementRequest = {
  agreementId: string
  name: string
}

export interface SubscriptionRequestBody {
  agreementId: string
  consentStatusId: string
}

export type SubscriptionAppRequest = {
  appId: string
  body: SubscriptionRequestBody[]
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
    fetchSubscriptionStatus: builder.query<SubscriptionStatusItem[], void>({
      query: () => `/api/apps/subscribed/subscription-status`,
    }),
    fetchProvidedApps: builder.query<AppMarketplaceApp[], void>({
      query: () => `/api/apps/provided`,
    }),
    fetchBusinessApps: builder.query<AppMarketplaceApp[], void>({
      query: () => `/api/apps/business`,
    }),
    fetchDocumentById: builder.mutation({
      query: (documentId) => ({
        url: `/api/administration/documents/${documentId}?documentId=${documentId}`,
        responseHandler: async (response) => ({
          headers: response.headers,
          data: await response.blob(),
        }),
      }),
    }),
    addSubscribeApp: builder.mutation<void, SubscriptionAppRequest>({
      query: (data: SubscriptionAppRequest) => ({
        url: `/api/apps/${data.appId}/subscribe-consent`,
        method: 'POST',
        body: data.body,
      }),
    }),
    fetchAgreements: builder.query<AgreementRequest[], string>({
      query: (appId) => `/api/apps/appAgreementData/${appId}`,
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
} = apiSlice
