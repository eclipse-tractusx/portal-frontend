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

export type AppMarketplaceState = {
  items: AppMarketplaceApp[]
  favorites: string[]
  latest: AppMarketplaceApp[]
  subscribed: AppMarketplaceApp[]
  loading: boolean
  error: string
}
