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
import { apiBaseQuery } from 'utils/rtkUtil'

export enum ApplicationStatus {
  CREATED = 'CREATED',
  ADD_COMPANY_DATA = 'ADD_COMPANY_DATA',
  INVITE_USER = 'INVITE_USER',
  SELECT_COMPANY_ROLE = 'SELECT_COMPANY_ROLE',
  UPLOAD_DOCUMENTS = 'UPLOAD_DOCUMENTS',
  VERIFY = 'VERIFY',
  SUBMITTED = 'SUBMITTED',
  DECLINED = 'DECLINED',
  CONFIRMED = 'CONFIRMED',
}

export enum ApplicationType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
}

export type ApplicationChecklist = {
  typeId: string
  statusId: string
}

export type ApplicationResponse = {
  applicationId: string
  applicationStatus: ApplicationStatus
  applicationChecklist: ApplicationChecklist[]
  applicationType: ApplicationType
}

export type Identifier = {
  type: string
  value: string
}

export type UniqueIdentifier = {
  id: number
  label: string
}

export type CompanyDetails = {
  companyId: string
  bpn: string
  name: string
  shortName: string
  city: string
  region: string
  streetAdditional: string
  streetName: string
  streetNumber: string
  zipCode: string
  countryAlpha2Code: string
  taxId: string
  uniqueIds: Identifier[]
  uniqueIdentifier: UniqueIdentifier[]
}

export type CompanyRoleData = {
  companyRole: string
  descriptions: {
    de: string
    en: string
  }
  agreementIds: string[]
}

export type AgreementData = {
  agreementId: string
  name: string
  agreementLink: string
  documentId: string
}

export type AgreementResponse = {
  companyRoles: CompanyRoleData[]
  agreements: AgreementData[]
}

export type AgreementConsents = {
  companyRoles: string[]
  agreements: {
    agreementId: string
    consentStatus: string
  }[]
}

export type companyRole = {
  companyRole: string
  agreementIds: string[]
  descriptions: { de: string; en: string }
}

export enum CONSENT_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const apiSlice = createApi({
  reducerPath: 'rtk/registration',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    fetchApplications: builder.query<ApplicationResponse[], void>({
      query: () => '/api/registration/applications',
    }),
    fetchCompanyDetailsWithAddress: builder.query<CompanyDetails, string>({
      query: (applicationId) =>
        `/api/registration/application/${applicationId}/companyDetailsWithAddress`,
    }),
    fetchAgreementData: builder.query<AgreementResponse, void>({
      query: () => '/api/registration/companyRoleAgreementData',
    }),
    fetchAgreementConsents: builder.query<AgreementConsents, string>({
      query: (applicationId) =>
        `/api/registration/application/${applicationId}/companyRoleAgreementConsents`,
    }),
    updateAgreementConsents: builder.mutation<void, AgreementConsents>({
      query: (data) => ({
        url: '/api/registration/Network/partnerRegistration/submit',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useFetchApplicationsQuery,
  useFetchCompanyDetailsWithAddressQuery,
  useFetchAgreementDataQuery,
  useFetchAgreementConsentsQuery,
  useUpdateAgreementConsentsMutation,
} = apiSlice
