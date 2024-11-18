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

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiBaseQuery } from 'utils/rtkUtil'
import { PAGE_SIZE } from 'types/Constants'

export type SubscriptionRequestBody = {
  page: number
  statusId: string
  offerId?: string
  sortingType: string
  companyName?: string
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

export enum ProcessStep {
  TRIGGER_PROVIDER = 'TRIGGER_PROVIDER',
  START_AUTOSETUP = 'START_AUTOSETUP',
  OFFERSUBSCRIPTION_CLIENT_CREATION = 'OFFERSUBSCRIPTION_CLIENT_CREATION',
  SINGLE_INSTANCE_SUBSCRIPTION_DETAILS_CREATION = 'SINGLE_INSTANCE_SUBSCRIPTION_DETAILS_CREATION',
  OFFERSUBSCRIPTION_TECHNICALUSER_CREATION = 'OFFERSUBSCRIPTION_TECHNICALUSER_CREATION',
  ACTIVATE_SUBSCRIPTION = 'ACTIVATE_SUBSCRIPTION',
  TRIGGER_PROVIDER_CALLBACK = 'TRIGGER_PROVIDER_CALLBACK',
  RETRIGGER_PROVIDER = 'RETRIGGER_PROVIDER',
  TRIGGER_ACTIVATE_SUBSCRIPTION = 'TRIGGER_ACTIVATE_SUBSCRIPTION',
}

export type SubscriptionDetailResponse = {
  id: string
  appInstanceId: string
  offerSubscriptionStatus: string
  name: string
  customer: string
  bpn: string
  contact: string[]
  technicalUserData: TechnicalUserData[]
  tenantUrl: string
  processStepTypeId: ProcessStep | null
  externalService: {
    trusted_issuer: string
    participant_id: string
    iatp_id: string
    did_resolver: string
    decentralIdentityManagementAuthUrl: string
    decentralIdentityManagementServiceUrl: string
  }
}

export type UserRoles = {
  roleId: string
  roleName: string
}

export type TechnicalProfilesResponse = {
  technicalUserProfileId: string
  userRoles: UserRoles[]
}

export type MetaBody = {
  totalElements: 0
  totalPages: 0
  page: 0
  contentSize: 0
}

export type CompanySubscriptionData = {
  bpnNumber: string
  companyId: string
  companyName: string
  subscriptionId: string
  offerSubscriptionStatus: string
  technicalUser?: boolean
  processStepTypeId: ProcessStep | null
}

export type SubscriptionContent = {
  offerId: string
  offerName: string
  companySubscriptionStatuses: CompanySubscriptionData[]
}

export type SubscriptionResponse = {
  meta: MetaBody
  content: SubscriptionContent[]
}

export type SubscriptionStoreRequest = {
  requestId: string
  offerUrl: string
}

export type SubscriptionActivationResponse = {
  technicalUserInfo: Array<{
    technicalUserId: string
    technicalUserSecret: string
    technicalClientId: string
    technicalUserPermissions: string[]
  }>
  clientInfo: {
    clientId: string
    clientUrl: string
  }
}

export type AppFiltersResponse = {
  id: string
  lastChanged: string
  leadPictureId: string
  name: string
  provider: string
  status: string
}

export type TenantUrlRequest = {
  appId: string
  subscriptionId: string
  body: { url: string }
}

export const apiSlice = createApi({
  reducerPath: 'rtk/apps/appSubscription',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    fetchSubscriptions: builder.query<
      SubscriptionResponse,
      SubscriptionRequestBody
    >({
      query: (body) => {
        const url = `/api/Apps/provided/subscription-status?size=${PAGE_SIZE}&page=${body.page}`
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
    fetchAppFilters: builder.query<AppFiltersResponse[], void>({
      query: () => '/api/apps/provided?statusId=Active',
    }),
    fetchSubscriptionDetail: builder.query<
      SubscriptionDetailResponse,
      SubscriptionDetailRequestBody
    >({
      query: (body) =>
        `/api/apps/${body.appId}/subscription/${body.subscriptionId}/provider`,
    }),
    addUserSubscribtion: builder.mutation<
      SubscriptionActivationResponse,
      SubscriptionStoreRequest
    >({
      query: (data: SubscriptionStoreRequest) => ({
        url: '/api/Apps/autoSetup',
        method: 'POST',
        body: data,
      }),
    }),
    updateTenantUrl: builder.mutation<void, TenantUrlRequest>({
      query: (data) => ({
        url: `/api/apps/appchange/${data.appId}/subscription/${data.subscriptionId}/tenantUrl`,
        method: 'PUT',
        body: data.body,
      }),
    }),
    activateSubscription: builder.mutation<void, string>({
      query: (subscriptionId) => ({
        url: `/api/apps/subscription/${subscriptionId}/activate `,
        method: 'PUT',
      }),
    }),
  }),
})

export const {
  useFetchSubscriptionsQuery,
  useFetchAppFiltersQuery,
  useFetchSubscriptionDetailQuery,
  useAddUserSubscribtionMutation,
  useUpdateTenantUrlMutation,
  useActivateSubscriptionMutation,
} = apiSlice
