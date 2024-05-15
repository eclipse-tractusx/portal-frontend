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
import { apiSsiCredentialQuery } from 'utils/rtkUtil'

export interface WalletSectionContent {
  name: string
  content: WalletContent
}

export enum CredentialSubjectStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  REVOKED = 'REVOKED',
}

export enum CredentialType {
  TRACEABILITY_FRAMEWORK = 'TRACEABILITY_FRAMEWORK',
  PCF_FRAMEWORK = 'PCF_FRAMEWORK',
  BEHAVIOR_TWIN_FRAMEWORK = 'BEHAVIOR_TWIN_FRAMEWORK',
  DISMANTLER_CERTIFICATE = 'DISMANTLER_CERTIFICATE',
  CIRCULAR_ECONOMY = 'CIRCULAR_ECONOMY',
  BUSINESS_PARTNER_NUMBER = 'BUSINESS_PARTNER_NUMBER',
  DEMAND_AND_CAPACITY_MANAGEMENT = 'DEMAND_AND_CAPACITY_MANAGEMENT',
  DEMAND_AND_CAPACITY_MANAGEMENT_PURIS = 'DEMAND_AND_CAPACITY_MANAGEMENT_PURIS',
  BUSINESS_PARTNER_DATA_MANAGEMENT = 'BUSINESS_PARTNER_DATA_MANAGEMENT',
  MEMBERSHIP = 'MEMBERSHIP',
}
export interface WalletContent {
  credentialType: CredentialType
  status: CredentialSubjectStatus
  expiryDate: string
  authority: string
}

export const apiSlice = createApi({
  reducerPath: 'rtk/companyWallet',
  baseQuery: fetchBaseQuery(apiSsiCredentialQuery()),
  endpoints: (builder) => ({
    fetchCompanyWallet: builder.query<WalletContent[], void>({
      query: () => {
        return {
          url: '/api/issuer/owned-credentials',
        }
      },
    }),
  }),
})

export const { useFetchCompanyWalletQuery } = apiSlice
