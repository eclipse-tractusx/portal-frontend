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
import { PAGE_SIZE } from 'types/Constants'

export interface SubscriptionRequestBody {
  page: number
  statusId: string
  sortingType: string
}

export type MetaBody = {
  totalElements: 0
  totalPages: 0
  page: 0
  contentSize: 0
}

export type CompanySubscriptionData = {
  companyId: string
  companyName: string
  subscriptionId: string
  offerSubscriptionStatus: string
}

export type SubscriptionContent = {
  offerId: string
  serviceName: string
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
  technicalUserInfo: {
    technicalUserId: string
    technicalUserSecret: string
    technicalClientId: string
  }
  clientInfo: {
    clientId: string
  }
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
        const statusId = `statusId=${body.statusId}`
        const sortingType = `sorting=${body.sortingType}`
        return {
          url: `/api/Apps/provided/subscription-status?size${PAGE_SIZE}&page=${
            body.page
          }&${body.statusId && statusId}&${body.sortingType && sortingType}`,
        }
      },
    }),
    addUserSubscribtion: builder.mutation<
      SubscriptionActivationResponse,
      SubscriptionStoreRequest
    >({
      query: (data: SubscriptionStoreRequest) => ({
        url: `/api/Apps/autoSetup`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useFetchSubscriptionsQuery, useAddUserSubscribtionMutation } =
  apiSlice
