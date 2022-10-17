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

import { initServicetNotifications } from 'types/MainTypes'
import { PageNotificationsProps } from 'cx-portal-shared-components'

export const name = 'admin/notification'

export interface ServiceAccountState {
  notification: PageNotificationsProps
}

export const initialState: ServiceAccountState = {
  notification: initServicetNotifications,
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
}

export interface NotificationContent {
  message?: string
  appId?: string
  userId?: string
}

export type CXNotification = {
  id: string
  created: Date
  typeId: NotificationType
  creatorId?: string
  content?: string
  contentParsed?: NotificationContent
  isRead?: boolean
  dueDate?: string
}
