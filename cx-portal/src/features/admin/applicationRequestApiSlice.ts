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
import { apiBaseQuery } from 'utils/rtkUtil'
import { PaginResult, PaginFetchArgs } from 'cx-portal-shared-components'
import { PAGE_SIZE } from 'types/Constants'

export enum ApplicationRequestStatus {
  CREATED = 'CREATED',
  CONFIRMED = 'CONFIRMED',
  DECLINED = 'DECLINED',
  SUBMITTED = 'SUBMITTED',
}

export interface DocumentMapper {
  documentType: string
  documentId: string
}

export interface ApplicationRequest {
  applicationId: string
  applicationStatus: ApplicationRequestStatus
  dateCreated: string
  companyName: string
  email: string
  bpn: string
  documents: Array<DocumentMapper>
}

export const apiSlice = createApi({
  reducerPath: 'rtk/admin/applicationRequest',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    approveRequest: builder.mutation<boolean, string>({
      query: (applicationId) => ({
        url: `/api/administration/registration/application/${applicationId}/approveRequest`,
        method: 'PUT',
      }),
    }),
    declineRequest: builder.mutation<boolean, string>({
      query: (applicationId) => ({
        url: `/api/administration/registration/application/${applicationId}/declineRequest`,
        method: 'PUT',
      }),
    }),
    fetchCompanySearch: builder.query<
      PaginResult<ApplicationRequest>,
      PaginFetchArgs
    >({
      query: (fetchArgs) =>
        fetchArgs.args && fetchArgs.args.expr
          ? `/api/administration/registration/applications?size=${PAGE_SIZE}&page=${
              fetchArgs.page
            }&companyName=${fetchArgs.args!.expr}`
          : `/api/administration/registration/applications?size=${PAGE_SIZE}&page=${fetchArgs.page}`,
    }),
    fetchDocumentById: builder.mutation({
      query: (documentId) => ({
        url: `/api/administration/Documents/${documentId}?documentId=${documentId}`,
        responseHandler: async (response) => ({
          headers: response.headers,
          data: await response.blob(),
        }),
      }),
    }),
  }),
})

export const {
  useApproveRequestMutation,
  useDeclineRequestMutation,
  useFetchCompanySearchQuery,
  useFetchDocumentByIdMutation,
} = apiSlice
