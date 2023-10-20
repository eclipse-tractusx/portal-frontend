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

export enum COMPANY_ROLE {
  ACTIVE_PARTICIPANT = 'ACTIVE_PARTICIPANT',
  APP_PROVIDER = 'APP_PROVIDER',
  SERVICE_PROVIDER = 'SERVICE_PROVIDER',
}

export enum UNIQUE_ID_TYPE {
  COMMERCIAL_REG_NUMBER = 'COMMERCIAL_REG_NUMBER',
}

export enum CONSENT_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export type PartnerRegistrationUniqeId = {
  type: UNIQUE_ID_TYPE
  value: string
}

export type PartnerRegistrationUser = {
  identityProviderId: string
  providerId: string
  username: string
  firstName: string
  lastName: string
  email: string
}

export type PartnerRegistration = {
  externalId: string
  bpn: string
  name: string
  streetName: string
  streetNumber: string
  city: string
  zipCode: string
  region: string
  countryAlpha2Code: string
  uniqueIds: Array<PartnerRegistrationUniqeId>
  userDetails: Array<PartnerRegistrationUser>
  companyRoles: Array<COMPANY_ROLE>
}

export type Agreement = {
  agreementId: string
  consentStatus?: CONSENT_STATUS.ACTIVE
}

export type PartnerRegistrationConsent = {
  companyRoles: Array<COMPANY_ROLE>
  agreements: Array<Agreement>
}

enum TAGS {
  PARTNER_REGISTRATION = 'PARTNER_REGISTRATION',
}

export const apiSlice = createApi({
  reducerPath: 'rtk/admin/network',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  tagTypes: [TAGS.PARTNER_REGISTRATION],
  endpoints: (builder) => ({
    registerPartner: builder.mutation<void, PartnerRegistration>({
      query: (data: PartnerRegistration) => ({
        url: '/api/administration/registration/Network/partnerRegistration',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [TAGS.PARTNER_REGISTRATION],
    }),
    registerPartnerConsent: builder.mutation<void, PartnerRegistrationConsent>({
      query: (data: PartnerRegistrationConsent) => ({
        url: '/api/registration/Network/partnerRegistration/submit',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [TAGS.PARTNER_REGISTRATION],
    }),
  }),
})

export const { useRegisterPartnerMutation, useRegisterPartnerConsentMutation } =
  apiSlice
