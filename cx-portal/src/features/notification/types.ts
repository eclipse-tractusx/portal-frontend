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
