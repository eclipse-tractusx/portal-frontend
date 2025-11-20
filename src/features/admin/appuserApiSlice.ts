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

import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'features/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  PaginResult,
  PaginFetchArgs,
} from '@catena-x/portal-shared-components'
import i18next from 'i18next'
import { PAGE_SIZE } from 'types/Constants'
import { apiBaseQuery } from 'utils/rtkUtil'
import type { TenantUser } from './userApiSlice'
export interface UserRoleRequest {
  appId: string
  companyUserId: string
  subscriptionId?: string
  body: string[]
}

export interface ResponseInfo {
  name: string
  info: string
}

export interface UserRoleResponse {
  success: Array<ResponseInfo>
  warning: Array<ResponseInfo>
}

export type CoreoffersRoles = {
  offerId: string
  roles: AppRole[]
}

export type AppRole = {
  roleId: string
  role: string
  description: string
}

export type PortalRoleRequest = {
  companyUserId: string
  offerId: string
  roles: string[]
}

export type PortalRoleResponse = {
  companyUserRoleText: string
  companyUserRoleId: string
}

export const apiSlice = createApi({
  reducerPath: 'rtk/apps/roles',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    fetchCoreoffersRoles: builder.query<CoreoffersRoles[], void>({
      query: () =>
        `/api/administration/user/owncompany/roles/coreoffers?lang=${i18next.language}`,
    }),
    fetchAppRoles: builder.query<AppRole[], string>({
      query: (appId: string) =>
        `/api/administration/user/owncompany/roles/apps/${appId}?languageShortName=${i18next.language}`,
    }),
    fetchAppUsers: builder.query<PaginResult<TenantUser>, PaginFetchArgs>({
      query: (fetchArgs) =>
        `/api/administration/user/owncompany/apps/${
          fetchArgs.args!.appId
        }/users?size=${PAGE_SIZE}&page=${fetchArgs.page}`,
    }),
    fetchAppUsersSearch: builder.query<PaginResult<TenantUser>, PaginFetchArgs>(
      {
        query: (fetchArgs) => {
          const emailExpr = `&email=${encodeURIComponent(fetchArgs.args!.expr)}`
          return {
            url: `/api/administration/user/owncompany/apps/${
              fetchArgs.args!.appId
            }/users?size=${PAGE_SIZE}&page=${fetchArgs.page}&hasRole=${
              fetchArgs.args!.role
            }${fetchArgs.args!.expr && emailExpr}`,
          }
        },
      }
    ),
    addUserRoles: builder.mutation<UserRoleResponse, UserRoleRequest>({
      query: (data: UserRoleRequest) => ({
        url: `/api/administration/user/owncompany/users/${data.companyUserId}/apps/${data.appId}/roles`,
        method: 'POST',
        body: data.body,
      }),
    }),
    updateUserRoles: builder.mutation<UserRoleResponse, UserRoleRequest>({
      query: (data: UserRoleRequest) => ({
        url: `/api/administration/user/owncompany/users/${data.companyUserId}/apps/${data.appId}/subscription/${data.subscriptionId}/roles`,
        method: 'PUT',
        body: data.body,
      }),
    }),
    updatePortalRoles: builder.mutation<
      PortalRoleResponse[],
      PortalRoleRequest
    >({
      query: (data) => ({
        url: `/api/administration/user/owncompany/users/${data.companyUserId}/coreoffers/${data.offerId}/roles`,
        method: 'PUT',
        body: data.roles,
      }),
    }),
  }),
})

export const {
  useFetchCoreoffersRolesQuery,
  useFetchAppRolesQuery,
  useFetchAppUsersQuery,
  useFetchAppUsersSearchQuery,
  useAddUserRolesMutation,
  useUpdateUserRolesMutation,
  useUpdatePortalRolesMutation,
} = apiSlice

const name = 'admin/user/role/add'

export enum SuccessErrorType {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface UserRoleState {
  userRoleResp: string
}

export const initialState: UserRoleState = {
  userRoleResp: '',
}

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setUserRoleResp: (state, action) => {
      state.userRoleResp = action.payload
    },
  },
})

export const currentUserRoleResp = (state: RootState): string => {
  return state.userRole.userRoleResp
}

export const { setUserRoleResp } = slice.actions
export default slice
