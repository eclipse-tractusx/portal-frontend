import { initialPaginResult, PaginResult, RequestState, initServicetNotifications } from 'types/MainTypes'
import { PageNotificationsProps } from 'cx-portal-shared-components'

export const name = 'admin/service'

export type ServiceAccount = {
  serviceAccountId: string
  clientId: string
  name: string
}

export interface ServiceAccountState {
  data: PaginResult<ServiceAccount>
  request: RequestState
  error: string
  notification: PageNotificationsProps
}

export const initialState: ServiceAccountState = {
  data: initialPaginResult,
  request: RequestState.NONE,
  error: '',
  notification: initServicetNotifications,
}
