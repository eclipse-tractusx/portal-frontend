import { RequestState } from 'types/MainTypes'

export const name = 'admin/user'

export type InviteData = {
  userName: string
  firstName: string
  lastName: string
  email: string
  organisationName: string
}

export type TenantUser = {
  userEntityId: string
  companyUserId: string
  status: string
  firstName: string
  lastName: string
  email: string
}

export type AddUser = {
  userName: string
  email: string
  firstName: string
  lastName: string
  roles: string[]
  message: string
}

export interface AdminUserState {
  addOpen: boolean
  addTechnicalUserOpen: boolean
  tenantUsers: Array<TenantUser>
  usersToAdd: Array<AddUser>
  addRequest: RequestState
  getRequest: RequestState
  error: string
}

export const initialState: AdminUserState = {
  tenantUsers: [],
  usersToAdd: [],
  getRequest: RequestState.NONE,
  addRequest: RequestState.NONE,
  addOpen: false,
  addTechnicalUserOpen: false,
  error: '',
}
