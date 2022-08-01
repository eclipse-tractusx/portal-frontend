import { RequestState } from 'types/MainTypes'

export const name = 'admin/userOwn'

export type UserDetail = {
  companyUserId: string
  firstName: string
  lastName: string
  email: string
  bpn: string[]
  created: string
  company: string
  status: string
}

export const InitialUserDetail = {
  companyUserId: '',
  firstName: '',
  lastName: '',
  email: '',
  bpn: [''],
  created: '',
  company: '',
  status: '',
}

export type AdminUserDetailState = {
  resetStatus: null
  data: UserDetail
  request: RequestState
  error: string
}

export const initialState: AdminUserDetailState = {
  resetStatus: null,
  data: InitialUserDetail,
  request: RequestState.NONE,
  error: '',
}
