export interface AppMarketplaceImage {
  src: string
  alt?: string
}

export type MouseEventHandler = (e: MouseEvent) => void

export interface AppMarketplaceApp {
  id: string
  title: string
  subtitle: string
  description: string
  price: string
  rating?: number
  useCase: string
  leadPicture: AppMarketplaceImage
  onButtonClick?: MouseEventHandler
  onSecondaryButtonClick?: MouseEventHandler
}

export interface AppMarketplaceInitialState {
  apps: AppMarketplaceApp[]
  loading: boolean
  error: string
}
