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
import type {
  PaginResult,
  PaginFetchArgs,
} from '@arena2036/portal-shared-components-construct-x'
import { PAGE_SIZE } from 'types/Constants'
import { apiBaseQuery } from 'utils/rtkUtil'
import { type InviteData } from './registration/types'

export enum CompanyInviteStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
}

export interface CompanyInvite {
  applicationId: string
  applicationStatus: CompanyInviteStatus
  dateCreated: Date
  companyName: string
  email: string
  firstName: string
  lastName: string
}

export const apiSlice = createApi({
  reducerPath: 'rtk/admin/invite',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    fetchInviteSearch: builder.query<
      PaginResult<CompanyInvite>,
      PaginFetchArgs
    >({
      query: (fetchArgs) =>
        `api/administration/registration/applicationsWithStatus?page=${
          fetchArgs.page
        }&size=${PAGE_SIZE}&companyName=${fetchArgs.args!.expr}`,
    }),
    sendInvite: builder.mutation<void, InviteData>({
      query: (data: InviteData) => ({
        url: '/api/administration/invitation',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useFetchInviteSearchQuery, useSendInviteMutation } = apiSlice
