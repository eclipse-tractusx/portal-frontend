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

export const name = 'admin/appManagement'

export type SearchInputState = {
  open: boolean
  text: string
}

export interface AppStatusDataState {
  title: string
  provider: string
  leadPictureUri: string
  providerName: string
  salesManagerId: string
  useCase: string[]
  descriptions: DescriptionState[]
  agreements: AgreementState[]
  supportedLanguageCodes: string[]
  price: string
  images: string[]
  providerUri: string
  contactEmail: string
  contactNumber: string
  documents: any
  privacyPolicies: string[]
}

export interface ServiceStatusDataState {
  title: string
  price: string
  leadPictureUri: string
  descriptions: DescriptionState[]
  agreements: AgreementState[]
  providerUri: string
  contactEmail: string
  contactNumber: string
  documents: any
  privacyPolicies: string[]
  serviceTypeIds: string[]
}

export interface DescriptionState {
  languageCode: string
  longDescription: string
  shortDescription: string
}

export interface AgreementState {
  id: string
  name: string
  consentStatus: string
}

export interface AppManagementState {
  searchInput: SearchInputState
  currentActiveStep: number
  appId: string
  appStatusData: AppStatusDataState
}

export interface ServiceManagementState {
  searchInput: SearchInputState
  currentActiveStep: number
  appId: string
  serviceStatusData: ServiceStatusDataState
}

export const initialState: AppManagementState = {
  searchInput: {
    open: false,
    text: '',
  },
  currentActiveStep: 1,
  appId: '',
  appStatusData: {
    title: '',
    provider: '',
    leadPictureUri: '',
    providerName: '',
    salesManagerId: '',
    useCase: [],
    descriptions: [],
    agreements: [],
    supportedLanguageCodes: [],
    price: '',
    images: [],
    providerUri: '',
    contactEmail: '',
    contactNumber: '',
    documents: {},
    privacyPolicies: [],
  },
}

export const initialServiceState: ServiceManagementState = {
  searchInput: {
    open: false,
    text: '',
  },
  currentActiveStep: 1,
  appId: '',
  serviceStatusData: {
    title: '',
    serviceTypeIds: [],
    price: '',
    leadPictureUri: '',
    descriptions: [],
    agreements: [],
    providerUri: '',
    contactEmail: '',
    contactNumber: '',
    documents: {},
    privacyPolicies: [],
  },
}
