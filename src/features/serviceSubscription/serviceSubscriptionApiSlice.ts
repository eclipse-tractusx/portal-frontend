/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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

import {
  type PaginFetchArgs,
  type PaginResult,
} from '@catena-x/portal-shared-components'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  type SubscribeConnectorData,
  type SubscribeTechnicalUserData,
  type SubscribedActiveApps,
} from 'features/apps/types'
import { type ProcessStep } from 'features/appSubscription/appSubscriptionApiSlice'
import i18next from 'i18next'
import { apiBaseQuery } from 'utils/rtkUtil'

export interface SubscriptionRequestType {
  page: number
  statusId: string
  offerId?: string
  sortingType: string
  companyName?: string
}
export interface SubscriptionResponseContentType {
  companyId: string
  companyName: string
  subscriptionId: string
  offerSubscriptionStatus: string
}

export type SubscriptionContent = {
  offerId: string
  offerName: string
  companySubscriptionStatuses: SubscriptionResponseContentType[]
}

export interface SubscriptionResponseType {
  meta: {
    totalElements: number
    totalPages: number
    page: number
    contentSize: number
  }
  content: SubscriptionContent[]
}

export interface SubscriptionStoreRequest {
  requestId: string
  offerUrl: string
}

export type ServiceFiltersResponse = {
  id: string
  lastChanged: string
  leadPictureId: string
  name: string
  provider: string
  status: string
}

export type SubscriptionDetailRequestBody = {
  appId: string
  subscriptionId: string
}

export type TechnicalUserData = {
  id: string
  name: string
  permissions: string[]
}

export type SubscriptionDetailResponse = {
  id: string
  appInstanceId?: string
  offerSubscriptionStatus: string
  name: string
  customer: string
  bpn: string
  contact: string[]
  technicalUserData: TechnicalUserData[]
  tenantUrl?: string
  processStepTypeId?: ProcessStep
}

export enum CompanyServiceSubscriptionFilterType {
  REQUESTED = 'PENDING',
  ACTIVE = 'ACTIVE',
  SHOW_ALL = ' ',
}

export enum LicenseType {
  COTS = 'COTS',
  FOSS = 'FOSS',
}

export enum OfferSubscriptionStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface OfferSubscriptionDataType {
  offerSubscriptionId: string
  offerSubscriptionStatus: OfferSubscriptionStatus
}

export enum ServiceTypes {
  DATASPACE_SERVICE = 'DATASPACE_SERVICE',
  CONSULTANCY_SERVICE = 'CONSULTANCY_SERVICE',
}

export interface ServiceDetailsResponse {
  id: string
  title: string
  provider: string
  contactEmail: string
  description: string
  licenseType: LicenseType
  price: string
  offerSubscriptionDetailData: OfferSubscriptionDataType[]
  serviceTypes: ServiceTypes
  technicalUserProfile: {
    [key: string]: string[] | null
  }
  leadPictureId?: string
  isSubscribed: string
  longDescription: string
}

export interface SubscriptionServiceRequestType {
  serviceId: string
  subscriptionId: string
}

export interface SubscriptionServiceResponseType {
  id: string
  offerSubscriptionStatus: OfferSubscriptionStatus
  name: string
  provider: string
  contact: string[]
  technicalUserData: SubscribeTechnicalUserData[]
  connectorData: SubscribeConnectorData[]
}

export const apiSlice = createApi({
  reducerPath: 'rtk/services/serviceSubscription',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    fetchServiceSubscriptions: builder.query<
      SubscriptionResponseType,
      SubscriptionRequestType
    >({
      query: (body) => {
        const url = `/api/services/provided/subscription-status?size=15&page=${body.page}`
        const statusId = body.statusId ? `&statusId=${body.statusId}` : ''
        const offerId = body.offerId ? `&offerId=${body.offerId}` : ''
        const sortingType = body.sortingType
          ? `&sorting=${body.sortingType}`
          : ''
        const companyName = body.companyName
          ? `&companyName=${body.companyName}`
          : ''
        return {
          url: `${url}${statusId}${offerId}${sortingType}${companyName}`,
        }
      },
    }),
    fetchServiceFilters: builder.query<ServiceFiltersResponse[], void>({
      query: () => '/api/services/provided',
    }),
    fetchServiceSubDetail: builder.query<
      SubscriptionDetailResponse,
      SubscriptionDetailRequestBody
    >({
      query: (body) =>
        `/api/services/${body.appId}/subscription/${body.subscriptionId}/provider`,
    }),
    fetchSubscriptionService: builder.query<
      SubscriptionServiceResponseType,
      SubscriptionServiceRequestType
    >({
      query: (obj) =>
        `/api/services/${obj.serviceId}/subscription/${obj.subscriptionId}/subscriber`,
      transformErrorResponse: (res) => {
        return {
          status: res.status,
          data: res.data,
        }
      },
    }),
    fetchServiceDetails: builder.query<ServiceDetailsResponse, string>({
      query: (id: string) => `/api/services/${id}?lang=${i18next.language}`,
    }),
    fetchCompanyServiceSubscriptions: builder.query<
      PaginResult<SubscribedActiveApps>,
      PaginFetchArgs
    >({
      query: (body) => {
        const url = `/api/services/provided/subscription-status?size=15&page=${body.page}`
        const statusId = body.args.statusFilter
          ? `&statusId=${body.args.statusFilter}`
          : ''
        const companyName = body.args.expr
          ? `&companyName=${body.args.expr}`
          : ''
        return {
          url: `${url}${statusId}${companyName}`,
        }
      },
    }),
    unsubscribeService: builder.mutation<void, string>({
      query: (subscriptionId) => ({
        url: `/api/services/${subscriptionId}/unsubscribe`,
        method: 'PUT',
      }),
    }),
  }),
})

export const {
  useFetchServiceSubscriptionsQuery,
  useFetchServiceFiltersQuery,
  useFetchServiceSubDetailQuery,
  useFetchSubscriptionServiceQuery,
  useFetchServiceDetailsQuery,
  useFetchCompanyServiceSubscriptionsQuery,
  useUnsubscribeServiceMutation,
} = apiSlice
