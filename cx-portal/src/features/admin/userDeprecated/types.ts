import { RequestState } from 'types/MainTypes'
import { TenantUser } from '../userApiSlice'

export const name = 'admin/user'

export type InviteData = {
  userName: string
  firstName: string
  lastName: string
  email: string
  organisationName: string
}

export type AddUser = {
  userName: string
  email: string
  firstName: string
  lastName: string
  roles?: string[]
  message: string
}

export type TechnicalUser = {
  userEntityId: string
  userName: string
  clientId: string
  authType: string
}

export interface AdminUserState {
  addOpen: boolean
  addTechnicalUserOpen: boolean
  tenantUsers: Array<TenantUser>
  usersToAdd: AddUser
  rolesToAdd: string[]
  addRequest: RequestState
  getRequest: RequestState
  error: string
}

export const InitialAddUser = {
  userName: '',
  email: '',
  firstName: '',
  lastName: '',
  roles: [],
  message: '',
}

export const initialState: AdminUserState = {
  tenantUsers: [],
  usersToAdd: InitialAddUser,
  rolesToAdd: [],
  getRequest: RequestState.NONE,
  addRequest: RequestState.NONE,
  addOpen: false,
  addTechnicalUserOpen: false,
  error: '',
}
