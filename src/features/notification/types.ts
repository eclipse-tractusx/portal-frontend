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

import { initServicetNotifications } from 'types/MainTypes'
import type { PageNotificationsProps } from '@catena-x/portal-shared-components'

export const name = 'admin/notification'

export const PAGE_SIZE = 10
export const PAGE = 0
export const SORT_OPTION = 'DateDesc'

export enum NOTIFICATION_TOPIC {
  ALL = 'ALL',
  ACTION = 'ACTION',
  INFO = 'INFO',
  OFFER = 'OFFER',
}

export type InitialNotificationType = {
  page: number
  size: number
  args: {
    notificationTopic: string
    sorting: string
  }
}

export interface ServiceAccountState {
  notification: PageNotificationsProps
  initialNotificationState: InitialNotificationType
}

export const initialState: ServiceAccountState = {
  notification: initServicetNotifications,
  initialNotificationState: {
    page: PAGE,
    size: PAGE_SIZE,
    args: {
      notificationTopic: NOTIFICATION_TOPIC.ALL,
      sorting: SORT_OPTION,
    },
  },
}

export enum NotificationType {
  INFO = 'INFO',
  ACTION = 'ACTION',
  WELCOME = 'WELCOME',
  WELCOME_USE_CASES = 'WELCOME_USE_CASES',
  WELCOME_SERVICE_PROVIDER = 'WELCOME_SERVICE_PROVIDER',
  WELCOME_CONNECTOR_REGISTRATION = 'WELCOME_CONNECTOR_REGISTRATION',
  WELCOME_APP_MARKETPLACE = 'WELCOME_APP_MARKETPLACE',
  APP_SUBSCRIPTION_REQUEST = 'APP_SUBSCRIPTION_REQUEST',
  APP_SUBSCRIPTION_ACTIVATION = 'APP_SUBSCRIPTION_ACTIVATION',
  APP_RELEASE_REQUEST = 'APP_RELEASE_REQUEST',
  APP_RELEASE_APPROVAL = 'APP_RELEASE_APPROVAL',
  TECHNICAL_USER_CREATION = 'TECHNICAL_USER_CREATION',
  CONNECTOR_REGISTERED = 'CONNECTOR_REGISTERED',
  Welcome = 'Welcome',
  WelcomeInvite = 'WelcomeInvite',
  WelcomeUser = 'WelcomeUser',
  WelcomeAppMarketplace = 'WelcomeAppMarketplace',
  NoUseCase = 'NoUseCase',
  NoConnector = 'NoConnector',
  ConnectorRegistered = 'ConnectorRegistered',
  PersonalMessage = 'PersonalMessage',
  AppRecommendation = 'AppRecommendation',
  AppRequestSubmitted = 'AppRequestSubmitted',
  AppRequestReceived = 'AppRequestReceived',
  AppRequestApproved = 'AppRequestApproved',
  AppRequestRejected = 'AppRequestRejected',
  AppSubscriptionSubmitted = 'AppSubscriptionSubmitted',
  AppSubscriptionReceived = 'AppSubscriptionReceived',
  AppSubscriptionApproved = 'AppSubscriptionApproved',
  AppSubscriptionRejected = 'AppSubscriptionRejected',
  APP_RELEASE_REJECTION = 'APP_RELEASE_REJECTION',
  SERVICE_REQUEST = 'SERVICE_REQUEST',
  SERVICE_RELEASE_REQUEST = 'SERVICE_RELEASE_REQUEST',
  ROLE_UPDATE_APP_OFFER = 'ROLE_UPDATE_APP_OFFER',
  ROLE_UPDATE_CORE_OFFER = 'ROLE_UPDATE_CORE_OFFER',
  CREDENTIAL_REJECTED = 'CREDENTIAL_REJECTED',
  CREDENTIAL_APPROVAL = 'CREDENTIAL_APPROVAL',
  SUBSCRIPTION_URL_UPDATE = 'SUBSCRIPTION_URL_UPDATE',
  APP_ROLE_ADDED = 'APP_ROLE_ADDED',
}

export interface NotificationContent {
  message?: string
  appId?: string
  userId?: string
  AppName?: string
  OfferName?: string
  RequestorCompanyName?: string
  username?: string
  coreOfferName?: string
  appName?: string
  removedRoles?: string
  addedRoles?: string
  type?: string | number
  newUrl?: string
  Roles?: string[]
}

export interface CXNotificationContent {
  id: string
  created: Date
  typeId: NotificationType
  creatorId?: string
  content?: string
  contentParsed?: NotificationContent
  isRead?: boolean
  dueDate?: string
  notificationTopic?: string
  type?: string
  done?: boolean
  userRead: boolean
}

export type CXNotificationMeta = {
  read: number
  unread: number
  infoUnread: number
  offerUnread: number
  actionRequired: number
}

export type CXNotificationPagination = {
  contentSize: number
  page: number
  totalElements: number
  totalPages: number
}

export type CXNotification = {
  content: CXNotificationContent[]
  meta: CXNotificationPagination
}
