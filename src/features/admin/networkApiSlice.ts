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
  VAT_ID = 'VAT_ID',
  LEI_CODE = 'LEI_CODE',
  VIES = 'VIES',
  EORI = 'EORI',
}

export enum CONSENT_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum REGISTRATION_APPLICATION_STATUS {
  PENDING = 'PENDING',
  CREATED = 'CREATED',
}

export enum REGISTRATION_APPLICATION_ITEM_TYPE {
  REGISTRATION_VERIFICATION = 'REGISTRATION_VERIFICATION',
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
  bpn: string | null
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
  agreements?: Array<AgreementConsent>
}

export type RegistrationApplicationItem = {
  typeId: REGISTRATION_APPLICATION_ITEM_TYPE
  statusId: string
}

export type RegistrationApplication = {
  applicationId: string
  applicationStatus: REGISTRATION_APPLICATION_STATUS
  applicationChecklist: Array<RegistrationApplicationItem>
}

export type Agreement = {
  agreementId: string
  name: string
  agreementLink: string
  documentId: string
}

export type AgreementConsent = {
  agreementId: string
  consentStatus?: CONSENT_STATUS.ACTIVE
}

export type PartnerRegistrationConsent = {
  companyRoles: Array<COMPANY_ROLE>
  agreements: Array<AgreementConsent>
}

export type CompanyRoleDescriptions = Record<string, string>

export type CompanyRole = {
  companyRole: COMPANY_ROLE
  descriptions: CompanyRoleDescriptions
  agreementIds: Array<string>
}

export type CompanyRoleAgreementData = {
  companyRoles: Array<CompanyRole>
  agreements: Array<Agreement>
}

export const emptyPartnerRegistration: PartnerRegistration = {
  externalId: '',
  name: '',
  bpn: null,
  streetName: '',
  streetNumber: '',
  city: '',
  zipCode: '',
  region: '',
  countryAlpha2Code: '',
  uniqueIds: [],
  userDetails: [
    {
      identityProviderId: '',
      providerId: '',
      username: '',
      firstName: '',
      lastName: '',
      email: '',
    },
  ],
  companyRoles: [],
}

export const emptyPartnerRegistrationConsent: PartnerRegistrationConsent = {
  companyRoles: [],
  agreements: [],
}

enum TAGS {
  PARTNER_REGISTRATION = 'PARTNER_REGISTRATION',
  REGISTRATION = 'REGISTRATION',
}

export const apiSlice = createApi({
  reducerPath: 'rtk/admin/network',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  tagTypes: [TAGS.PARTNER_REGISTRATION, TAGS.REGISTRATION],
  endpoints: (builder) => ({
    registerPartner: builder.mutation<void, PartnerRegistration>({
      query: (data: PartnerRegistration) => ({
        url: '/api/administration/registration/Network/partnerRegistration',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [TAGS.PARTNER_REGISTRATION],
    }),
    fetchCompanyRoleAgreementData: builder.query<
      CompanyRoleAgreementData,
      void
    >({
      query: () => '/api/registration/companyRoleAgreementData',
      providesTags: [TAGS.REGISTRATION],
    }),
  }),
})

export const {
  useRegisterPartnerMutation,
  useFetchCompanyRoleAgreementDataQuery,
} = apiSlice
