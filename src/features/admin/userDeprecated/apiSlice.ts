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
import type { TenantUser } from '../userApiSlice'
import type { AddUser } from './types'
import type { PaginResult } from '@catena-x/portal-shared-components'
import { apiBaseQuery } from 'utils/rtkUtil'

export const apiSlice = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    getTenantUsers: builder.query<PaginResult<TenantUser>, void>({
      query: () =>
        '/api/administration/user/owncompany/users?status=ACTIVE&page=0&size=20',
    }),
    addTenantUsers: builder.mutation<AddUser[], AddUser[]>({
      query: (users) => ({
        url: '/api/administration/user/owncompany/users',
        method: 'POST',
        body: users,
      }),
    }),
    searchTenantUsers: builder.query<TenantUser[], string>({
      query: (expr) =>
        `/api/administration/user/owncompany/users?status=ACTIVE&firstName=${expr}&lastName=${expr}`,
    }),
  }),
})

export const {
  useGetTenantUsersQuery,
  useAddTenantUsersMutation,
  useSearchTenantUsersQuery,
} = apiSlice
