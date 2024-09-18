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
import { apiBaseQuery } from 'utils/rtkUtil'

export type PaginationData = {
  totalElements: number
  page: number
  totalPages: number
}

export type ComapnyDataType = {
  companyId: string
  name: string
}

export type ConnectorsType = {
  connectorId: string
  name: string
  companyId: string
  companyName: string
}

export type CompanyDataResponse = {
  content: Array<ComapnyDataType>
  meta: PaginationData
}

export interface CompanyDataRequestType {
  page: number
}

export type ConnectorsResponse = {
  content: Array<ConnectorsType>
  meta: PaginationData
}

export interface ConnectorsRequestType {
  page: number
}

export const apiSlice = createApi({
  reducerPath: 'rtk/admin/clearingHouseSD',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  //   tagTypes: ['certificate'],
  endpoints: (builder) => ({
    fetchCompanyData: builder.query<
      CompanyDataResponse,
      CompanyDataRequestType
    >({
      query: ({ page }) =>
        `/api/administration/companyData/missing-sd-document?page=${page}&size=15`,
      keepUnusedDataFor: 5,
    }),
    fetchConnectors: builder.query<ConnectorsResponse, ConnectorsRequestType>({
      query: ({ page }) =>
        `/api/administration/connectors/missing-sd-document?page=${page}&size=15`,
      //   providesTags: ['certificate'],
    }),
  }),
})

export const { useFetchConnectorsQuery, useFetchCompanyDataQuery } = apiSlice
