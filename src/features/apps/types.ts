/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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

import type { CardItems } from '@arena2036/portal-shared-components-construct-x'
import type { PrivacyPolicyType } from 'features/adminBoard/adminBoardApiSlice'
import type { UseCaseType } from 'features/appManagement/types'
import {
  type OfferSubscriptionStatus,
  type OfferSubscriptionDataType,
} from 'features/serviceSubscription/serviceSubscriptionApiSlice'

export type ImageType = {
  src: string
  alt?: string
}

export interface AppInfo {
  status: string
  id: string | undefined
  name: string | undefined
}

export type AppItem = {
  addButtonClicked: boolean
  description: string
  id: string
  image: ImageType
  leadPictureId: string
  licenseType: string
  name: string
  onButtonClick: () => void
  onClick: () => void
  onSecondaryButtonClick: () => void
  price: string
  provider: string
  shortDescription: string
  subtitle: string
  title: string
  useCases: string[]
}

export type AppMarketplaceApp = {
  id: string
  title: string
  provider: string
  leadPictureUri: string
  shortDescription: string
  useCases: UseCaseType[]
  price: string
  rating?: number
  uri?: string
  status?: SubscriptionStatus
  image?: ImageType
  name?: string
  lastChanged?: string
  timestamp?: number
  leadPictureId?: string
  subscriptionStatus?: SubscriptionStatus
  addButtonClicked?: boolean
}

export interface ProvidedApps {
  meta: {
    contentSize: number
    page: number
    totalElements: number
    totalPages: number
  }
  content: AppMarketplaceApp[]
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  INACTIVE = 'INACTIVE',
}

export enum SubscriptionStatusText {
  ACTIVE = 'Active',
  PENDING = 'Pending',
  INACTIVE = 'Inactive',
  IN_REVIEW = 'In Review',
  CREATED = 'In Progress',
}

export type ActiveSubscriptionItem = {
  offerId: string
  name: string
  provider: string
  image?: ImageType
}

export type SubscriptionStatusItem = {
  offerId: string
  status: SubscriptionStatus
}

export type SubscriptionStatusDuplicateItem = {
  appId?: string
  offerSubscriptionStatus?: SubscriptionStatus
  name?: string
  provider?: string
  image?: ImageType
  status?: SubscriptionStatus
  offerId?: string
}

export enum DocumentTypeText {
  CONFORMITY_DOCUMENT = 'ConformityDocument',
  DOCUMENTS = 'Documents',
  CONFORMITY_APPROVAL_BUSINESS_APPS = 'CONFORMITY_APPROVAL_BUSINESS_APPS',
  CONFORMITY_APPROVAL_SERVICES = 'CONFORMITY_APPROVAL_SERVICES',
}

export type DocumentData = {
  documentId: string
  documentName: string
}

export type AppDetails = AppMarketplaceApp & {
  providerUri: string
  contactEmail: string
  contactNumber: string
  images: string[]
  documents: Documents
  longDescription: string
  isSubscribed: string
  tags: string[]
  languages: string[]
  leadPictureUri?: ImageType
  privacyPolicies: PrivacyPolicyType[]
  roles?: string[]
  description?: {
    languageCode: string
    longDescription: string
    shortDescription: string
  }[]
  technicalUserProfile?: {
    [key: string]: string[] | null
  }
  offerSubscriptionDetailData?: OfferSubscriptionDataType[]
}

export type Documents = {
  ADDITIONAL_DETAILS: Array<DocumentData>
  APP_CONTRACT: Array<DocumentData>
  APP_TECHNICAL_INFORMATION: Array<DocumentData>
  CONFORMITY_APPROVAL_BUSINESS_APPS: Array<DocumentData>
}

export type AppDetailsState = {
  item: AppDetails
  loading: boolean
  error: string
}

export type AgreementRequest = {
  agreementId: string
  name: string
  mandatory: boolean
}

export interface SubscriptionRequestBody {
  agreementId: string
  consentStatusId: string
}

export type SubscriptionAppRequest = {
  appId: string
  body: SubscriptionRequestBody[]
}

export type DocumentRequestData = {
  appId: string
  documentId: string
}

export type ActiveAppsData = {
  id: string
  name: string
  shortDescription: string
  provider: string
  price: string
  leadPictureId: string
  useCases: string[]
  status?: string
}

export interface ActiveSubscription {
  offerId: string
  name: string
  provider: string
  image: string
  subscriptionId: string
}

export interface SubscribeTechnicalUserData {
  id: string
  name: string
  permissions: Array<string>
}

export interface SubscribeConnectorData {
  id: string
  name: string
  endpoint: string
}

export interface ActiveSubscriptionDetails {
  offerId: string
  name: string
  provider: string
  image: string
  subscriptionId: string
  offerSubscriptionStatus: string
  technicalUserData: SubscribeTechnicalUserData[]
  connectorData: SubscribeConnectorData[]
}

export interface FetchSubscriptionAppQueryType {
  subscriptionId: string
  appId: string
}

export type AppMarketplaceCard = AppMarketplaceApp & CardItems

export enum AppGroup {
  ALL = 'all',
  USE_CASES = 'useCases',
}

export type AppsControlState = {
  search: string
  group: AppGroup
}

export const initialState: AppsControlState = {
  search: '',
  group: AppGroup.ALL,
}

export enum CompanySubscriptionFilterType {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SHOW_ALL = 'show all',
}

export interface SubscribedActiveApps {
  offerId: string
  name: string
  provider: string
  status: string
  subscriptionId: string
  image: string
}

export enum StatusIdEnum {
  Active = 'Active',
  Inactive = 'Inactive',
  InReview = 'InReview',
  WIP = 'WIP',
  All = 'All',
}

export interface FetchSubscriptionResponseType {
  id: string
  offerSubscriptionStatus: OfferSubscriptionStatus
  name: string
  provider: string
  contact: string[]
  technicalUserData: SubscribeTechnicalUserData[]
  connectorData: SubscribeConnectorData[]
}
