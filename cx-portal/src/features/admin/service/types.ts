export const name = 'admin/service'

export interface ServiceAccountCreate {
  name: string
  description: string
  authenticationType: string
}

export interface ServiceAccount {
  serviceAccountId: string
  clientId: string
  name: string
}

export interface ServiceAccountDetail extends ServiceAccount {
  description: string
  authenticationType: string
  secret: string
}
