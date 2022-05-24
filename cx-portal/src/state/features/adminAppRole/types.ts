import { RequestState } from 'types/MainTypes'

export type AppRole = {
  role: string
  description: string
}

export interface AdminAppRoleState {
  items: Array<AppRole>
  request: RequestState
  error: string
}
