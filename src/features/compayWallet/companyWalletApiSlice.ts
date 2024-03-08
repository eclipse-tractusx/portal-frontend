/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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
import { apiIdentityWalletQuery } from 'utils/rtkUtil'

export interface WalletSectionContent {
  name: string
  content: WalletContent
}

export enum CredentialSubjectStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  UNKNOWN = 'Unknown',
}

export enum CredentialSubjectType {
  SummaryCredential = 'SummaryCredential',
  MembershipCredential = 'MembershipCredential',
  BpnCredential = 'BpnCredential',
  VerifiableCredential = 'VerifiableCredential',
  Framework = 'Framework',
  CompanyRole = 'CompanyRole',
}
export interface CredentialSubject {
  holderIdentifier: string
  id: string
  type: CredentialSubjectType
  contractTemplate: string
  items?: CredentialSubjectType[]
  status?: string
  memberOf?: string
  startTime?: string
}
export interface WalletContent {
  issuanceDate: string
  credentialSubject: CredentialSubject[]
  id: string
  proof: {
    proofPurpose: string
    type: string
    verificationMethod: string
    created: string
    jws: string
  }
  type: CredentialSubjectType[]
  '@context': string[]
  issuer: string
  expirationDate: string
}
export interface CompanyWalletType {
  content: WalletContent[]
  pageable: {
    sort: {
      unsorted: boolean
      sorted: boolean
      empty: boolean
    }
    pageSize: number
    pageNumber: number
    offset: number
    paged: boolean
    unpaged: boolean
  }
  totalPages: number
  totalElements: number
  last: boolean
  first: boolean
  numberOfElements: number
  size: number
  number: number
  sort: {
    unsorted: boolean
    sorted: boolean
    empty: boolean
  }
  empty: boolean
}

export const apiSlice = createApi({
  reducerPath: 'rtk/companyWallet',
  baseQuery: fetchBaseQuery(apiIdentityWalletQuery()),
  endpoints: (builder) => ({
    fetchCompanyWallet: builder.query<CompanyWalletType, void>({
      query: () => {
        return {
          url: '/api/credentials',
        }
      },
    }),
  }),
})

export const { useFetchCompanyWalletQuery } = apiSlice
