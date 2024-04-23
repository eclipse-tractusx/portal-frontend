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
import { apiBaseQuery } from 'utils/rtkUtil'

export type PaginationData = {
  totalElements: number
  page: number
  totalPages: number
}

export type CompanyDataSiteType = {
  siteName: string
  street: string
  postalCode: string
  city: string
  region: string
  countryCode: string
  countryIdentifier: string
  identifierNumber: string
}

export type CompanyDataAddressType = {
  companySite: string
  street: string
  postalCode: string
  city: string
  addressTitle: string
}

export interface CompanyDataRequestType {
  page: number
}

export enum Tags {
  companydata = 'companydata',
}

export const apiSlice = createApi({
  reducerPath: 'rtk/admin/companyCertificate',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  tagTypes: [Tags.companydata],
  endpoints: (builder) => ({
    fetchCompanyData: builder.query<CompanyDataAddressType, CompanyDataRequestType>({
      query: ({ page }) =>
        `/v6/input/business-partners/search?page=${page}&size=30`,
      providesTags: [Tags.companydata],
    }),
    fetchCompanyDetail: builder.query<CompanyDataAddressType, string>({
      query: (id) => `/v6/input/business-partners/${id}/search?`,
      providesTags: [Tags.companydata],
    }),
  }),
})

export const { useFetchCompanyDataQuery, useFetchCompanyDetailQuery } = apiSlice
