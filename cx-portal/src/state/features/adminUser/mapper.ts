import { TenantUser } from './types'

export const getUserWithId = (user: TenantUser): TenantUser => ({
  ...user,
  id: user.userEntityId,
})
