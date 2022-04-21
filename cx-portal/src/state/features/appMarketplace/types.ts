export type AppMarketplaceApp = {
  id: string
  title: string
  subtitle: string
  description: string
  price: string
  rating?: number
  useCase: string
  leadPicture: string
}

export type AppMarketplaceState = {
  items: AppMarketplaceApp[]
  loading: boolean
  error: string
}
