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
  Welcome = 'Welcome',
  WelcomeInvite = 'WelcomeInvite',
  WelcomeUser = 'WelcomeUser',
  WelcomeAppMarketplace = 'WelcomeAppMarketplace',
  NoUseCase = 'NoUseCase',
  NoConnector = 'NoConnector',
  ConnectorRegistered = 'ConnectorRegistered',
  PersonalMessage = 'PersonalMessage',
  AppRecommendation = 'AppRecommendation',
  AppRequest = 'AppRequest',
  AppRequestApproved = 'AppRequestApproved',
  AppRequestRejected = 'AppRequestRejected',
  AppSubscription = 'AppSubscription',
  AppSubscriptionApproved = 'AppSubscriptionApproved',
  AppSubscriptionRejected = 'AppSubscriptionRejected',
}

export interface MessageNotification {
  message: string
}

export interface AppRelatedNotification {
  appId: string
}

export type CXNotification = {
  id: string
  created: Date
  notificationTypeId: NotificationType
  creatorId?: string
  content?: MessageNotification | AppRelatedNotification
}
