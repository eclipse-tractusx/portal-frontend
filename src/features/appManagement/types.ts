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

import type { ConsentStatusEnum } from './apiSlice'

export const name = 'admin/appManagement'

export enum ErrorType {
  REQUIRED = 'required',
}

export enum AppOverviewTypes {
  APP_OVERVIEW_DETAILS = 'appOverviewDetails',
}

export type SearchInputState = {
  open: boolean
  text: string
}

export type LanguageStatusType = {
  languageCode: string
}

export type UseCaseType = {
  id: string
  label: string
}

export interface AppStatusDataState {
  title: string
  provider?: string
  leadPictureId?: string
  providerName?: string
  useCase?: UseCaseType[]
  descriptions: {
    languageCode: string
    longDescription: string
    shortDescription: string
  }[]
  agreements?: {
    id: string
    name: string
    consentStatus: ConsentStatusEnum
  }[]
  supportedLanguageCodes?: string[]
  price: string
  images?: string[] | []
  providerUri: string
  contactEmail: string
  contactNumber?: string
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  documents: any
  salesManagerId?: string | null
  privacyPolicies?: string[] | []
  leadPictureUri?: string
  technicalUserProfile?: {
    [key: string]: string[] | null
  }
}

export interface DescriptionState {
  languageCode: string
  longDescription: string
  shortDescription: string
}

export interface AgreementState {
  id: string
  name: string
  consentStatus: ConsentStatusEnum
}

export interface AppManagementState {
  searchInput: SearchInputState
  currentActiveStep: number
  appId: string
  appRedirectStatus: boolean
  appStatusData: AppStatusDataState
}

export interface UserRoleType {
  roleId: string
  roleName: string
  type: string
}

export interface TechnicalUserProfiles {
  technicalUserProfileId: string
  userRoles: UserRoleType[]
}

export const initialState: AppManagementState = {
  searchInput: {
    open: false,
    text: '',
  },
  currentActiveStep: 1,
  appId: '',
  appRedirectStatus: true,
  appStatusData: {
    title: '',
    provider: '',
    leadPictureId: '',
    providerName: '',
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
    salesManagerId: null,
    privacyPolicies: [],
    leadPictureUri: '',
    technicalUserProfile: {},
  },
}
