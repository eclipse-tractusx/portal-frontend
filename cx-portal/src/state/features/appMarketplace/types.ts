export type AppMarketplaceApp = {
  id: string
  title: string
  provider: string
  shortDescription: string
  price: string
  rating?: number
  useCase: string[]
  leadPictureUri: string
}

export type AppMarketplaceState = {
  items: AppMarketplaceApp[]
  loading: boolean
  error: string
}
