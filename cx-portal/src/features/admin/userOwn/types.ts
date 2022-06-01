import { RequestState } from 'types/MainTypes'

export const name = 'admin/userOwn'

export type OwnUser = {
  companyUserId: string
  firstName: string
  lastName: string
  email: string
  bpn: string
  created: string
  company: string
  status: string
}

export type AdminOwnUserState = {
  data: OwnUser | null
  request: RequestState
  error: string
}

export const initialState: AdminOwnUserState = {
  data: null,
  request: RequestState.NONE,
  error: '',
}
