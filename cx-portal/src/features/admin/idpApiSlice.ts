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

export enum IDPCategory {
  KEYCLOAK_SHARED = 'KEYCLOAK_SHARED',
  OWN = 'OWN',
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
  JWT = 'JWT',
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

export interface IdentityProviderUpdateBody {
  displayName?: string
  oidc?: OIDCType
  saml?: OIDCType
}
export interface IdentityProviderUpdate {
  identityProviderId: string
  body: IdentityProviderUpdateBody
}

export interface IdentityProvider {
  identityProviderId: string
  alias: string
  identityProviderCategoryId: IDPCategory
  displayName?: string
  redirectUrl: string
  enabled: boolean
  mappers: Array<IDPMapper>
  oidc?: OIDCType
  saml?: OIDCType
}

export const apiSlice = createApi({
  reducerPath: 'rtk/admin/idp',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    fetchIDPList: builder.query<Array<IdentityProvider>, number | null>({
      query: (update: number) =>
        `/api/administration/identityprovider/owncompany/identityproviders${
          update ? '?' + update : ''
        }`,
    }),
    fetchIDPDetail: builder.query<IdentityProvider, string>({
      query: (id: string) =>
        `/api/administration/identityprovider/owncompany/identityproviders/${id}`,
    }),
    addIDP: builder.mutation<IdentityProvider, IDPAuthType>({
      query: (protocol: IDPAuthType) => ({
        url: `/api/administration/identityprovider/owncompany/identityproviders?protocol=${protocol}`,
        method: 'POST',
      }),
    }),
    updateIDP: builder.mutation<IdentityProvider, IdentityProviderUpdate>({
      query: (idpUpdate: IdentityProviderUpdate) => ({
        url: `/api/administration/identityprovider/owncompany/identityproviders/${idpUpdate.identityProviderId}`,
        method: 'PUT',
        body: idpUpdate.body,
      }),
    }),
    removeIDP: builder.mutation<IdentityProvider, string>({
      query: (id: string) => ({
        url: `/api/administration/identityprovider/owncompany/identityproviders/${id}`,
        method: 'DELETE',
      }),
    }),
    enableIDP: builder.mutation<IdentityProvider, IDPStatus>({
      query: (status: IDPStatus) => ({
        url: `/api/administration/identityprovider/owncompany/identityproviders/${status.id}/status?enabled=${status.enabled}`,
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useFetchIDPListQuery,
  useFetchIDPDetailQuery,
  useAddIDPMutation,
  useUpdateIDPMutation,
  useRemoveIDPMutation,
  useEnableIDPMutation,
} = apiSlice
