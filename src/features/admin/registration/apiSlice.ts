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
import { PAGE_SIZE } from 'types/Constants'
import type { PaginResult } from '@catena-x/portal-shared-components'
import type { SearchParams } from '../../connector/types'
import type {
  CompanyDetail,
  InviteData,
  InvitesDataGrid,
  RegistrationRequestDataGrid,
} from './types'
import { apiBaseQuery } from 'utils/rtkUtil'

export const apiSlice = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    getRegistrationRequests: builder.query<
      {
        content: RegistrationRequestDataGrid[]
        meta: { totalElements: number; page: number }
      },
      SearchParams
    >({
      query: (params) => ({
        url: '/api/administration/registration/applications',
        params,
      }),
    }),

    getCompanyDetail: builder.query<CompanyDetail, string>({
      query: (applicationId) => ({
        url: `/api/administration/registration/application/${applicationId}/companyDetailsWithAddress`,
      }),
    }),

    getItems: builder.query<PaginResult<InvitesDataGrid>, number>({
      query: (page) => ({
        url: '/api/administration/registration/applicationsWithStatus',
        params: { page, size: PAGE_SIZE },
      }),
    }),

    postInviteBusinessPartner: builder.mutation<void, InviteData>({
      query: (invite) => ({
        url: '/api/administration/invitation',
        method: 'POST',
        body: invite,
      }),
    }),
  }),
})

export const {
  useGetRegistrationRequestsQuery,
  useGetCompanyDetailQuery,
  useGetItemsQuery,
  usePostInviteBusinessPartnerMutation,
} = apiSlice
