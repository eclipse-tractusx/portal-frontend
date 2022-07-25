import { RequestState } from 'types/MainTypes'

export const name = 'admin/userOwn'

export type OwnUser = {
  companyUserId: string
  firstName: string
  lastName: string
  email: string
  bpn: string[]
  created: string
  company: string
  status: string
}

export const InitialOwnUser = {
  companyUserId: '',
  firstName: '',
  lastName: '',
  email: '',
  bpn: [''],
  created: '',
  company: '',
  status: '',
}

export type AdminOwnUserState = {
  resetStatus: null
  data: OwnUser
  request: RequestState
  error: string
}

export const initialState: AdminOwnUserState = {
  resetStatus: null,
  data: InitialOwnUser,
  request: RequestState.NONE,
  error: '',
}
