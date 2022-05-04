export type InviteData = {
  userName: string
  firstName: string
  lastName: string
  email: string
  organisationName: string
}

export type TenantUser = {
  userId: string
  providerUserId: string
  enabled: boolean
  userName: string
  firstName: string
  lastName: string
  email: string
  role?: string
  status?: string
}

export type AddUser = {
  userName: string
  eMail: string
  firstName: string
  lastName: string
  role: string
  message: string
}
export interface AdminUserState {
  tenantUsers: Array<TenantUser>
  usersToAdd: Array<AddUser>
  loading: boolean
  error: string
  addOpen: boolean
}
