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

import {
  type PaginFetchArgs,
  type PaginResult,
} from '@arena2036/portal-shared-components-construct-x'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type RootState } from 'features/store'
import { apiBaseQuery } from 'utils/rtkUtil'

export enum IDPCategory {
  SHARED = 'SHARED',
  OWN = 'OWN',
  MANAGED = 'MANAGED',
}

export enum IDPProviderType {
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

export enum IdpAccountStatus {
  ACTIVE = 'active',
  OPEN = 'open',
  IDP_CREATED = 'Idp created',
  DISABLED = 'disabled',
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

export interface OIDCType {
  secret?: string
  authorizationUrl?: string
  clientAuthMethod: OIDCAuthMethod
  clientId: string
  hasClientSecret?: boolean
  logoutUrl?: string
  metadataUrl: string
  signatureAlgorithm?: OIDCSignatureAlgorithm
  tokenUrl?: string
}

export interface SAMLType {
  serviceProviderEntityId: string
  singleSignOnServiceUrl: string
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
  alias: string
  displayName?: string
  enabled: boolean
  identityProviderCategoryId: string
  identityProviderId: string
  identityProviderTypeId: IDPCategory
  redirectUrl: string
  mappers: Array<IDPMapper>
  oidc?: OIDCType
  saml?: SAMLType
}

export type AddIDPStep1Type = {
  name: string
  authType: IDPAuthType
  providerType: IDPProviderType
}

const initialState: AddIDPStep1Type = {
  name: '',
  authType: IDPAuthType.OIDC,
  providerType: IDPProviderType.OWN,
}

export interface ManagedIDPNetworkType {
  identityProviderId: string
  alias: string
  identityProviderCategoryId: string
  identityProviderTypeId: string
  displayName: string
  redirectUrl: string
  enabled: boolean
  connectedCompanies?:
    | {
        companyId: string
        companyName: string
      }[]
    | null
}

export type networkCompany = {
  companyId: string
  externalId: string
  applicationId: string
  applicationStatus: string
  applicationDateCreated: string
  dateCreated: string
  lastChangedDate: string
  companyName: string
  companyRoles?: string[] | null
  identityProvider?: IdentityProviderEntity[] | null
  bpn: string
  activeUsers: number
}
export interface IdentityProviderEntity {
  identityProviderId: string
  alias: string
}

export interface RegistartionStatusCallbackType {
  callbackUrl: string
  authUrl?: string
  clientId: string
  clientSecret: string
}

enum TAGS {
  IDP = 'idp',
}

export const slice = createSlice({
  name: 'admin/idp/control',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => ({
      ...state,
      name: action.payload,
    }),
    setAuthType: (state, action: PayloadAction<IDPAuthType>) => ({
      ...state,
      authType: action.payload,
    }),
    setProviderType: (state, action: PayloadAction<IDPProviderType>) => ({
      ...state,
      providerType: action.payload,
    }),
  },
})

export const idpAddSelector = (state: RootState): AddIDPStep1Type =>
  state.admin.idp

export const idpAddNameSelector = (state: RootState): string =>
  state.admin.idp.name

export const idpAddAuthTypeSelector = (state: RootState): IDPAuthType =>
  state.admin.idp.authType

export const idpAddProviderTypeSelector = (state: RootState): IDPProviderType =>
  state.admin.idp.providerType

export const apiSlice = createApi({
  reducerPath: 'admin/idp/api',
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
    fetchManagedIDPNetwork: builder.query<ManagedIDPNetworkType, string>({
      query: (id: string) =>
        `/api/administration/identityprovider/network/identityproviders/managed/${id}`,
    }),
    fetchCompaniesList: builder.query<
      PaginResult<networkCompany>,
      PaginFetchArgs
    >({
      query: (filters) =>
        `/api/administration/registration/network/companies?page=${filters.page}&size=10`,
    }),
    fetchRegistartionStatusCallback: builder.query<
      RegistartionStatusCallbackType,
      void
    >({
      query: () => '/api/administration/RegistrationStatus/callback',
    }),
    updateRegistartionStatusCallback: builder.mutation<
      void,
      RegistartionStatusCallbackType
    >({
      query: (data: RegistartionStatusCallbackType) => ({
        url: '/api/administration/RegistrationStatus/callback',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { setName, setAuthType, setProviderType } = slice.actions

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
  useFetchManagedIDPNetworkQuery,
  useFetchCompaniesListQuery,
  useFetchRegistartionStatusCallbackQuery,
  useUpdateRegistartionStatusCallbackMutation,
} = apiSlice

export default slice
