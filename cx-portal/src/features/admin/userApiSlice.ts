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
import { getApiBase } from 'services/EnvironmentService'
import UserService from 'services/UserService'
import { PaginResult } from 'types/MainTypes'
import { PAGE_SIZE } from 'types/Constants'

export interface UserAppRoles {
  appId: string
  roles: string[]
}

export interface UserBase {
  companyUserId: string
  status: string
  firstName: string
  lastName: string
  email: string
}

export interface TenantUser extends UserBase {
  userEntityId: string
  roles: string[]
}

export interface TenantUserDetails extends TenantUser {
  created: string
  bpn: string[]
  company: string
  assignedRoles: UserAppRoles[]
}

export const apiSlice = createApi({
  reducerPath: 'rtk/admin/users',
  baseQuery: fetchBaseQuery({
    baseUrl: getApiBase(),
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${UserService.getToken()}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    fetchUsers: builder.query<PaginResult<TenantUser>, number | void>({
      query: (page: number = 0) =>
        `/api/administration/user/owncompany/users?status=ACTIVE&size=${PAGE_SIZE}&page=${page}`,
    }),
    fetchUserDetails: builder.query<TenantUserDetails, string>({
      query: (id: string) => `/api/administration/user/owncompany/users/${id}`,
    }),
  }),
})

export const { useFetchUsersQuery, useFetchUserDetailsQuery } = apiSlice
