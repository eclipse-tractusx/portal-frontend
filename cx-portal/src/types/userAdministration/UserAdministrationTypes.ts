export type InviteData = {
  userName: string
  firstName: string
  lastName: string
  email: string
  organizationName: string
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

export interface UserAdministrationInitialState {
  tenantUsers: TenantUser[]
  loading: boolean
  error: string
}
