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
import i18next from 'i18next'
import type {
  PaginFetchArgs,
  PaginResult,
} from '@catena-x/portal-shared-components'

import { apiBaseQuery } from 'utils/rtkUtil'
import { PAGE_SIZE } from 'types/Constants'

export enum ServiceAccountType {
  SECRET = 'SECRET',
}

export enum Tags {
  SERVICEACCOUNTS = 'SERVICEACCOUNTS',
}

export interface ServiceAccountRole {
  roleId: string
  roleDescription: string
  roleName: string
  roleType: string
  onlyAccessibleByProvider: boolean
}

export interface ServiceAccountCreate {
  name: string
  description: string
  authenticationType: ServiceAccountType
  roleIds: string[]
}

export enum ServiceAccountStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  PENDING_DELETION = 'PENDING_DELETION',
}

export interface ServiceAccountListEntry {
  serviceAccountId: string
  clientId: string
  name: string
  status: ServiceAccountStatus
  isOwner?: boolean
  userType: string
  offer?: {
    name?: string
  }
  connector?: {
    name?: string
  }
}

export interface ConnectedObject {
  id: string
  name: string
}

export interface ServiceAccountDetail extends ServiceAccountListEntry {
  description: string
  authenticationType: ServiceAccountType
  secret: string
  roles: ServiceAccountRole[]
  connector: ConnectedObject
  offer: ConnectedObject
  companyServiceAccountTypeId: companyServiceAccountType
  usertype: string
  authenticationServiceUrl: string
}

export type AppRoleCreate = {
  companyUserId: string
  roles: string[]
}

export interface ServiceAccountsResponseType {
  content: ServiceAccountListEntry[]
  meta: {
    contentSize: number
    page: number
    totalElements: number
    totalPages: number
  }
}

export enum ServiceAccountStatusFilter {
  SHOW_ALL = 'show all',
  MANAGED = 'MANAGED',
  OWNED = 'OWNED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum companyServiceAccountType {
  MANAGED = 'MANAGED',
  OWNED = 'OWN',
}
export interface PaginFetchArgsExtended extends PaginFetchArgs {
  size?: number
}
export const apiSlice = createApi({
  reducerPath: 'rtk/admin/service',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  tagTypes: [Tags.SERVICEACCOUNTS],
  endpoints: (builder) => ({
    addServiceAccount: builder.mutation<
      ServiceAccountDetail[],
      ServiceAccountCreate
    >({
      query: (body: ServiceAccountCreate) => ({
        url: '/api/administration/serviceaccount/owncompany/serviceaccounts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [Tags.SERVICEACCOUNTS],
    }),
    removeServiceAccount: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/api/administration/serviceaccount/owncompany/serviceaccounts/${id}`,
        method: 'DELETE',
      }),
    }),
    fetchServiceAccountList: builder.query<
      PaginResult<ServiceAccountListEntry>,
      PaginFetchArgsExtended
    >({
      query: (fetchArgs) => {
        const isFetchArgs = fetchArgs.args && fetchArgs.args.expr !== ''
        const url = `/api/administration/serviceaccount/owncompany/serviceaccounts?size=${fetchArgs.size ?? PAGE_SIZE}&page=${fetchArgs.page}`
        const isOwner =
          fetchArgs.args!.statusFilter === ServiceAccountStatusFilter.OWNED
        if (
          isFetchArgs &&
          fetchArgs.args.statusFilter &&
          fetchArgs.args.statusFilter !== ServiceAccountStatusFilter.SHOW_ALL
        ) {
          return `${url}&clientId=${fetchArgs.args!.expr}&isOwner=${isOwner}`
        } else if (
          isFetchArgs &&
          fetchArgs.args.statusFilter &&
          fetchArgs.args.statusFilter === ServiceAccountStatusFilter.SHOW_ALL
        ) {
          return `${url}&clientId=${fetchArgs.args!.expr}`
        } else if (
          !isFetchArgs &&
          fetchArgs.args.statusFilter &&
          fetchArgs.args.statusFilter === ServiceAccountStatusFilter.ACTIVE
        ) {
          return `${url}&userStatus=ACTIVE`
        } else if (
          !isFetchArgs &&
          fetchArgs.args.statusFilter &&
          fetchArgs.args.statusFilter === ServiceAccountStatusFilter.INACTIVE
        ) {
          return `${url}&filterForInactive=true`
        } else if (
          !isFetchArgs &&
          fetchArgs.args.statusFilter &&
          fetchArgs.args.statusFilter !== ServiceAccountStatusFilter.SHOW_ALL
        ) {
          return `${url}&isOwner=${isOwner}`
        } else {
          return url
        }
      },
      providesTags: [Tags.SERVICEACCOUNTS],
    }),
    fetchServiceAccountDetail: builder.query<ServiceAccountDetail, string>({
      query: (id: string) =>
        `/api/administration/serviceaccount/owncompany/serviceaccounts/${id}`,
    }),
    fetchServiceAccountRoles: builder.query<ServiceAccountRole[], void>({
      query: () =>
        `/api/administration/serviceaccount/user/roles?languageShortName=${i18next.language}`,
    }),
    resetCredential: builder.mutation<ServiceAccountDetail, string>({
      query: (id: string) => ({
        url: `api/administration/serviceaccount/owncompany/serviceaccounts/${id}/resetCredentials`,
        method: 'POST',
      }),
    }),
    fetchServiceAccountUsers: builder.query<
      ServiceAccountsResponseType,
      { page: number; pageSize?: number }
    >({
      query: ({ page, pageSize }) =>
        `/api/administration/serviceaccount/owncompany/serviceaccounts?page=${page}&size=${pageSize ? pageSize : PAGE_SIZE}&filterForInactive=false&userStatus=ACTIVE`,
    }),
    declineServiceSubscription: builder.mutation<void, string>({
      query: (subscriptionId) => ({
        url: `/api/services/subscription/${subscriptionId}/decline`,
        method: 'PUT',
      }),
    }),
  }),
})

export const {
  useAddServiceAccountMutation,
  useRemoveServiceAccountMutation,
  useFetchServiceAccountListQuery,
  useFetchServiceAccountDetailQuery,
  useFetchServiceAccountRolesQuery,
  useResetCredentialMutation,
  useFetchServiceAccountUsersQuery,
  useDeclineServiceSubscriptionMutation,
} = apiSlice
