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

export type AgreementsData = {
  agreementId: string
  agreementName: string
  consentStatus: string
  documentId: string
  mandatory?: boolean
}

export type CompanyRolesResponse = {
  companyRoles: string
  companyRolesActive: boolean
  roleDescription: string
  agreements: AgreementsData[]
}

export type RoleFeatureData = {
  title: string
  description: string
}

export type RoleFeatureArray = {
  features: RoleFeatureData[]
  roles: RoleFeatureData[]
}

export type SampleRoleData = {
  selected: RoleFeatureArray
  deselected: RoleFeatureArray
}

export type RolesData = {
  ACTIVE_PARTICIPANT: SampleRoleData
  APP_PROVIDER: SampleRoleData
  SERVICE_PROVIDER: SampleRoleData
  ONBOARDING_SERVICE_PROVIDER: SampleRoleData
}

export type AgreementsDataRequest = {
  agreementId: string
  consentStatus: string
}

export type CompanyRoleRequest = {
  companyRoles: string
  agreements: AgreementsDataRequest[]
}

export const apiSlice = createApi({
  reducerPath: 'rtk/apps/companyRoles',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    fetchRoles: builder.query<CompanyRolesResponse[], void>({
      query: () => {
        return {
          url: '/api/administration/companydata/companyRolesAndConsents',
        }
      },
    }),
    updateCompanyRoles: builder.mutation<void, CompanyRoleRequest[]>({
      query: (data: CompanyRoleRequest[]) => ({
        url: '/api/administration/companydata/companyRolesAndConsents',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useFetchRolesQuery, useUpdateCompanyRolesMutation } = apiSlice
