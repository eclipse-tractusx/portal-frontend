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
  notificationTypeId: NotificationType
  creatorId?: string
  content?: string
  contentParsed?: NotificationContent
  read?: boolean
}
