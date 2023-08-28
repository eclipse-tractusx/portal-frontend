/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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
import i18next from 'i18next'
import { PAGE_SIZE } from 'types/Constants'
import { PaginFetchArgs, PaginResult } from '@catena-x/portal-shared-components'

export enum ServiceAccountType {
  SECRET = 'SECRET',
}

export interface ServiceAccountRole {
  roleId: string
  roleDescription: string
  roleName: string
}

export interface ServiceAccountCreate {
  name: string
  description: string
  authenticationType: ServiceAccountType
  roleIds: string[]
}

export interface ServiceAccountListEntry {
  serviceAccountId: string
  clientId: string
  name: string
}

export interface ServiceAccountDetail extends ServiceAccountListEntry {
  description: string
  authenticationType: ServiceAccountType
  secret: string
  roles: ServiceAccountRole[]
}

export type AppRoleCreate = {
  companyUserId: string
  roles: string[]
}

export enum ServiceAccountStatusFilter {
  ALL = 'ALL',
  MANAGED = 'MANAGED',
  OWNED = 'OWNED',
}

export const apiSlice = createApi({
  reducerPath: 'rtk/admin/service',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    addServiceAccount: builder.mutation<
      ServiceAccountDetail,
      ServiceAccountCreate
    >({
      query: (body: ServiceAccountCreate) => ({
        url: '/api/administration/serviceaccount/owncompany/serviceaccounts',
        method: 'POST',
        body,
      }),
    }),
    removeServiceAccount: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/api/administration/serviceaccount/owncompany/serviceaccounts/${id}`,
        method: 'DELETE',
      }),
      transformErrorResponse: (error: any) =>
        error?.errors?.[
          'Org.Eclipse.TractusX.Portal.Backend.Administration.Service'
        ]?.[0] ?? i18next.t('error.deleteTechUserNotificationErrorDescription'),
    }),
    fetchServiceAccountList: builder.query<
      PaginResult<ServiceAccountListEntry>,
      PaginFetchArgs
    >({
      query: (fetchArgs) => {
        console.log(fetchArgs)
        const isFetchArgs = fetchArgs.args && fetchArgs.args.expr !== ''
        const url = `/api/administration/serviceaccount/owncompany/serviceaccounts?size=${PAGE_SIZE}&page=${fetchArgs.page}`
        const isOwner =
          fetchArgs.args!.statusFilter === ServiceAccountStatusFilter.OWNED
        if (
          isFetchArgs &&
          fetchArgs.args.statusFilter &&
          fetchArgs.args.statusFilter !== ServiceAccountStatusFilter.ALL
        ) {
          return `${url}&clientId=${fetchArgs.args!.expr}&isOwner=${isOwner}`
        } else if (
          isFetchArgs &&
          fetchArgs.args.statusFilter &&
          fetchArgs.args.statusFilter === ServiceAccountStatusFilter.ALL
        ) {
          return `${url}&clientId=${fetchArgs.args!.expr}`
        } else if (
          !isFetchArgs &&
          fetchArgs.args.statusFilter &&
          fetchArgs.args.statusFilter !== ServiceAccountStatusFilter.ALL
        ) {
          return `${url}&isOwner=${isOwner}`
        } else {
          return url
        }
      },
    }),
    fetchServiceAccountDetail: builder.query<ServiceAccountDetail, string>({
      query: (id: string) =>
        `/api/administration/serviceaccount/owncompany/serviceaccounts/${id}`,
    }),
    fetchServiceAccountRoles: builder.query<ServiceAccountRole[], void>({
      query: () =>
        `/api/administration/serviceaccount/user/roles?languageShortName=${i18next.language}`,
    }),
  }),
})

export const {
  useAddServiceAccountMutation,
  useRemoveServiceAccountMutation,
  useFetchServiceAccountListQuery,
  useFetchServiceAccountDetailQuery,
  useFetchServiceAccountRolesQuery,
} = apiSlice
