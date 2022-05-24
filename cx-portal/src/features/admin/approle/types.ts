import { RequestState } from 'types/MainTypes'

export const name = 'admin/approle'

export type AppRole = {
  role: string
  description: string
}

export interface AdminAppRoleState {
  items: Array<AppRole>
  request: RequestState
  error: string
}

export const initialState: AdminAppRoleState = {
  items: [],
  request: RequestState.NONE,
  error: '',
}
