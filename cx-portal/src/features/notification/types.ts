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
  WelcomeAppMarketplace = 'WelcomeAppMarketplace',
  PersonalMessage = 'PersonalMessage',
  AppRecommendation = 'AppRecommendation'
}

export interface PersonalMessageNotification {
  originator: string
  message: string
}

export interface AppRecommendationNotification extends PersonalMessageNotification {
  appId: string
}

export type CXNotification = {
  id: string
  time: Date
  notificationTypeId: NotificationType
  content?: PersonalMessageNotification | AppRecommendationNotification
}