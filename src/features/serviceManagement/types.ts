/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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
import type { UseCaseType } from 'features/appManagement/types'

export const name = 'admin/serviceManagement'

export interface ServiceStatusDataState {
  id: string
  title: string
  providerUri: string
  contactEmail: string
  descriptions: {
    languageCode: string
    longDescription: string
    shortDescription: string
  }[]
  price: string
  offerSubscriptionDetailData: {
    offerSubscriptionId: string
    offerSubscriptionStatus: string
  }[]
  serviceTypeIds: string[]
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  documents: any
  leadPictureUri?: string
  leadPictureId?: string
  images?: string[] | []
  salesManagerId?: string | null
  privacyPolicies?: []
  providerName?: string
  contactNumber?: string
  supportedLanguageCodes?: string[]
  useCase?: UseCaseType[]
  provider?: string
  agreements?: {
    consentStatus: ConsentStatusEnum
    name: string
  }[]
  technicalUserProfile?: {
    [key: string]: string[] | null
  }
}

export interface AgreementState {
  id: string
  name: string
  consentStatus: ConsentStatusEnum
}

export interface ServiceManagementState {
  serviceReleaseActiveStep: number
  serviceId: string
  serviceRedirectStatus: boolean
  serviceStatusData: ServiceStatusDataState
}

export enum SORTING_TYPE {
  RELEASE_DATE_DESC = 'ReleaseDateDesc',
  PROVIDER_DESC = 'ProviderDesc',
}

export const initialState: ServiceManagementState = {
  serviceReleaseActiveStep: 1,
  serviceId: '',
  serviceRedirectStatus: true,
  serviceStatusData: {
    id: '',
    title: '',
    providerUri: '',
    contactEmail: '',
    descriptions: [],
    price: '',
    offerSubscriptionDetailData: [],
    serviceTypeIds: [],
    documents: {},
    leadPictureUri: '',
    leadPictureId: '',
    images: [],
    salesManagerId: null,
    providerName: '',
    contactNumber: '',
    supportedLanguageCodes: [],
    useCase: [],
    provider: '',
    agreements: [],
    technicalUserProfile: {},
  },
}
