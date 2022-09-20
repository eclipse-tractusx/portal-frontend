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

import { PaginResult } from 'cx-portal-shared-components'
import { initialPaginResult, RequestState } from 'types/MainTypes'

export const name = 'admin/registration'

export type InviteData = {
  userName: string
  firstName: string
  lastName: string
  email: string
  organisationName: string
}

export type RegistrationRequestAPIResponse = {
  content: Array<RegistrationRequest>
  meta: PaginationData
}

export type CompanyDetail = {
  companyId: string
  name: string
  bpn: string
  taxId: string
  streetName: string
  streetNumber: string
  zipCode: string
  city: string
  countryDe: string
}

export type RegistrationRequestDocument = {
  documentType: string
  documentHash: string
}

export type CompanyApplicationInfo = {
  companyName: string
  email: string
  bpn: string
}

export type RegistrationRequest = {
  applicationId: string
  dateCreated: Date
  companyName: string
  email: string
  bpn: string
  documents: Array<RegistrationRequestDocument>
  applicationStatus: string
}

export type RegistrationRequestDataGrid = {
  applicationId: string
  dateCreated: Date
  companyInfo: CompanyApplicationInfo
  documents: Array<RegistrationRequestDocument>
  status: string
}

export type PaginationData = {
  totalElements: number
  page: number
}

export interface AdminRegistrationState {
  registrationRequests: Array<RegistrationRequestDataGrid>
  companyDetail: CompanyDetail
  loading: boolean
  detailLoading: boolean
  error: string
  request: RequestState
  data: PaginResult<InvitesDataGrid>
  paginationData: PaginationData
}

export const initialState: AdminRegistrationState = {
  registrationRequests: [],
  companyDetail: {} as CompanyDetail,
  loading: false,
  detailLoading: false,
  error: '',
  request: RequestState.NONE,
  data: initialPaginResult,
  paginationData: {} as PaginationData,
}

export type InvitesDataGrid = {
  applicationStatus: string
  dateCreated: Date
  companyName: string
  firstName: string
  lastName: string
  email: string
}
