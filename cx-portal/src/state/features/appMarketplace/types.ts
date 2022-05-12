export type AppMarketplaceApp = {
  id: string
  title: string
  provider: string
  shortDescription: string
  price: string
  rating?: number
  useCase?: string[]
  leadPictureUri: string
  link?: string
}

export type AppMarketplaceState = {
  items: AppMarketplaceApp[]
  latest: AppMarketplaceApp[]
  subscribed: AppMarketplaceApp[]
  loading: boolean
  error: string
}
