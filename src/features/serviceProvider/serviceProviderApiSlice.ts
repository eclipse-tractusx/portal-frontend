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

export type SubscriptionRequest = {
  offerId: string
  offerName: string
  status: string
}

export type ServiceProviderAPIResponse = {
  id: string
  companyId: string
  url: string
}

export type AgreementRequest = {
  agreementId: string
  name: string
}

export interface SubscriptionRequestBody {
  agreementId: string
  consentStatusId: string
}

export type SubscriptionServiceRequest = {
  serviceId: string
  body: SubscriptionRequestBody[]
}

export type ServiceRequest = {
  url: string
}

export const apiSlice = createApi({
  reducerPath: 'rtk/apps/serviceprovider',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    fetchServiceProvider: builder.query<ServiceProviderAPIResponse, void>({
      query: () => '/api/administration/subscriptionconfiguration/owncompany',
    }),
    addServiceProvider: builder.mutation<void, ServiceRequest>({
      query: (data) => ({
        url: '/api/administration/subscriptionconfiguration/owncompany',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
})

export const { useFetchServiceProviderQuery, useAddServiceProviderMutation } =
  apiSlice
