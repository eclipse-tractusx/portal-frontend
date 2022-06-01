import { initialPaginResult, PaginResult, RequestState } from 'types/MainTypes'

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
}

export const initialState: ServiceAccountState = {
  data: initialPaginResult,
  request: RequestState.NONE,
  error: '',
}
