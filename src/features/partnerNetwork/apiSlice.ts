/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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
import { type BusinessPartnerResponse, type BusinessPartner } from './types'
import { getApiBase, getBpdmPoolApiBase } from 'services/EnvironmentService'
import { type SearchParams } from 'types/MainTypes'
import UserService from 'services/UserService'
import qs from 'qs'

export const apiSlice = createApi({
  reducerPath: 'partnerNetworkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getBpdmPoolApiBase(),
    prepareHeaders: (headers: Headers) => {
      headers.set('authorization', `Bearer ${UserService.getToken()}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    getAllBusinessPartners: builder.query<
      BusinessPartnerResponse,
      SearchParams
    >({
      query: (filters) => `/catena/business-partner?${qs.stringify(filters)}`, // Convert the filters object to query params
    }),
    getBusinessPartnerByBpn: builder.query<BusinessPartner, string>({
      query: (bpn) => `/catena/legal-entities/${bpn}`,
    }),
    getAllMemberCompanies: builder.query<string[], void>({
      query: () =>
        `${getApiBase()}/api/administration/partnernetwork/memberCompanies`,
    }),
  }),
})

export const {
  useGetAllBusinessPartnersQuery,
  useGetBusinessPartnerByBpnQuery,
  useGetAllMemberCompaniesQuery,
} = apiSlice
