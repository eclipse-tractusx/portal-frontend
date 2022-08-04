import { RequestState } from 'types/MainTypes'

export const name = 'admin/approle'

export type AppRole = {
  roleId: string
  role: string
  description: string
}

export interface AdminAppRoleState {
  roles: Array<AppRole>
  request: RequestState
  error: string
}

export const initialState: AdminAppRoleState = {
  roles: [],
  request: RequestState.NONE,
  error: '',
}
