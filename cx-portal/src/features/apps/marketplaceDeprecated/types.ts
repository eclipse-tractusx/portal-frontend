export const name = 'apps/marketplace'

export type AppMarketplaceApp = {
  id: string
  title: string
  provider: string
  leadPictureUri: string
  shortDescription: string
  useCases: string[]
  price: string
  rating?: number
  link?: string
}

export type SubscribedApps = {
  appId: string
  appSubscriptionStatus: string
}

export type AppMarketplaceState = {
  items: AppMarketplaceApp[]
  latest: AppMarketplaceApp[]
  subscribed: AppMarketplaceApp[]
  subscribedApps: SubscribedApps[]
  loading: boolean
  error: string
}

export const initialState: AppMarketplaceState = {
  items: [],
  latest: [],
  subscribed: [],
  subscribedApps: [],
  loading: true,
  error: '',
}
