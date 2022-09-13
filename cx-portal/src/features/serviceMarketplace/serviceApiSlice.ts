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
import { PAGE_SIZE } from 'types/Constants'

export type ServiceRequest = {
  id: string
  title: string
  provider: string
  leadPictureUri: string
  contactEmail: string
  description: string
  price: string
}

export type PaginationData = {
  contentSize: number
  page: number
  totalElements: number
  totalPages: number
}

export type ServiceRequestAPIResponse = {
  content: Array<ServiceRequest>
  meta: PaginationData
}

export const apiSlice = createApi({
  reducerPath: 'rtk/apps/roles',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    fetchServices: builder.query<ServiceRequestAPIResponse, number>({
      query: (page) => `/api/services/active?size=${PAGE_SIZE}&page=${page}`,
    }),
    fetchService: builder.query<ServiceRequest, string>({
      query: (serviceId) =>
        `/api/services/${serviceId}?lang=${i18next.language}`,
    }),
    addSubscribeService: builder.mutation<void, string>({
      query: (serviceId) => ({
        url: `/api/services/${serviceId}/subscribe`,
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useFetchServicesQuery,
  useFetchServiceQuery,
  useAddSubscribeServiceMutation,
} = apiSlice
