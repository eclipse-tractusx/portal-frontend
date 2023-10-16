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

export enum IDPCategory {
  SHARED = 'SHARED',
  OWN = 'OWN',
}

export enum IDPProviderType {
  NONE = 'NONE',
  OWN = 'OWN',
  MANAGED = 'MANAGED',
}

export enum IDPAuthType {
  OIDC = 'OIDC',
  SAML = 'SAML',
}

export enum IDPMapperType {
  OIDC_USERNAME = 'OIDC_USERNAME',
  HARDCODED_ATTRIBUTE = 'HARDCODED_ATTRIBUTE',
}

export enum IDPSyncModeType {
  INHERIT = 'INHERIT',
}

export enum OIDCAuthMethod {
  SECRET_BASIC = 'SECRET_BASIC',
}

export enum OIDCSignatureAlgorithm {
  ES256 = 'ES256',
  RS256 = 'RS256',
}

export enum SAMLAuthMethod {
  SECRET = 'SECRET',
}

export interface IDPMapperConfig {
  syncMode: IDPSyncModeType
}

export interface IDPStatus {
  id: string
  enabled: boolean
}

export interface IDPMapper {
  id: string
  name: string
  type: IDPMapperType
  config: IDPMapperConfig
}

interface BaseAuthType {
  authorizationUrl?: string
  clientId: string
}
export interface OIDCType extends BaseAuthType {
  clientAuthMethod: OIDCAuthMethod
  signatureAlgorithm?: OIDCSignatureAlgorithm
  metadataUrl?: string
  secret?: string
}

export interface SAMLType extends BaseAuthType {
  clientAuthMethod: SAMLAuthMethod
  signatureAlgorithm?: string
}

export interface AddIDPRequest {
  protocol: IDPAuthType
  identityProviderTypeId: string
}

export interface IdentityProviderUpdateBody {
  displayName?: string
  oidc?: OIDCType
  saml?: OIDCType
}

export interface IdentityProviderUpdate {
  identityProviderId: string
  body: IdentityProviderUpdateBody
}

export interface IdentityProviderUser {
  identityProviderId: string
  companyUserId: string
  userId: string
  userName?: string
}

export interface UserIdentityProvider {
  companyUserId: string
  identityProviderId: string
}

export interface UserIdentityProvidersItem {
  identityProviderId: string
  userId: string
  userName?: string
}

export interface UserIdentityProviders {
  companyUserId: string
  firstName: string
  lastName: string
  email: string
  identityProviders: Array<UserIdentityProvidersItem>
}

export interface IdentityProvider {
  identityProviderId: string
  alias: string
  identityProviderTypeId: IDPCategory
  displayName?: string
  redirectUrl: string
  enabled: boolean
  mappers: Array<IDPMapper>
  oidc?: OIDCType
  saml?: OIDCType
}

enum TAGS {
  IDP = 'idp',
}

export const apiSlice = createApi({
  reducerPath: 'rtk/admin/idp',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  tagTypes: [TAGS.IDP],
  endpoints: (builder) => ({
    fetchIDPList: builder.query<Array<IdentityProvider>, void>({
      query: () =>
        '/api/administration/identityprovider/owncompany/identityproviders',
      providesTags: [TAGS.IDP],
    }),
    fetchIDPDetail: builder.query<IdentityProvider, string>({
      query: (id: string) =>
        `/api/administration/identityprovider/owncompany/identityproviders/${id}`,
    }),
    addIDP: builder.mutation<IdentityProvider, AddIDPRequest>({
      query: (data: AddIDPRequest) => ({
        url: `/api/administration/identityprovider/owncompany/identityproviders?protocol=${data.protocol}&typeId=${data.identityProviderTypeId}`,
        method: 'POST',
      }),
      invalidatesTags: [TAGS.IDP],
    }),
    updateIDP: builder.mutation<IdentityProvider, IdentityProviderUpdate>({
      query: (idpUpdate: IdentityProviderUpdate) => ({
        url: `/api/administration/identityprovider/owncompany/identityproviders/${idpUpdate.identityProviderId}`,
        method: 'PUT',
        body: idpUpdate.body,
      }),
      invalidatesTags: [TAGS.IDP],
    }),
    removeIDP: builder.mutation<IdentityProvider, string>({
      query: (id: string) => ({
        url: `/api/administration/identityprovider/owncompany/identityproviders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAGS.IDP],
    }),
    enableIDP: builder.mutation<IdentityProvider, IDPStatus>({
      query: (status: IDPStatus) => ({
        url: `/api/administration/identityprovider/owncompany/identityproviders/${status.id}/status?enabled=${status.enabled}`,
        method: 'POST',
      }),
      invalidatesTags: [TAGS.IDP],
    }),
    updateUserIDP: builder.mutation<IdentityProvider, IdentityProviderUser>({
      query: (idpUser: IdentityProviderUser) => ({
        url: `/api/administration/identityprovider/owncompany/users/${idpUser.companyUserId}/identityprovider/${idpUser.identityProviderId}`,
        method: 'PUT',
        body: {
          userId: idpUser.userId,
          userName: idpUser.userName,
        },
      }),
    }),
    fetchIDPUsersList: builder.query<Array<UserIdentityProviders>, string>({
      query: (id: string) =>
        `/api/administration/identityprovider/owncompany/users?identityProviderIds=${id}&unlinkedUsersOnly=false`,
    }),
    fetchIDPUser: builder.query<
      UserIdentityProvidersItem,
      UserIdentityProvider
    >({
      query: (useridp: UserIdentityProvider) =>
        `/api/administration/identityprovider/owncompany/users/${useridp.companyUserId}/identityprovider/${useridp.identityProviderId}`,
    }),
  }),
})

export const {
  useFetchIDPListQuery,
  useFetchIDPDetailQuery,
  useFetchIDPUserQuery,
  useFetchIDPUsersListQuery,
  useAddIDPMutation,
  useUpdateIDPMutation,
  useRemoveIDPMutation,
  useEnableIDPMutation,
  useUpdateUserIDPMutation,
} = apiSlice
