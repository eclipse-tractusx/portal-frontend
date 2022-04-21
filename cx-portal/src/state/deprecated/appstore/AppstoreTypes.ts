export interface AppstoreImage {
  src: string
  alt?: string
}

export type MouseEventHandler = (e: MouseEvent) => void

export interface AppstoreApp {
  id: string
  title: string
  subtitle: string
  description: string
  price: string
  rating?: number
  image?: AppstoreImage
  onButtonClick?: MouseEventHandler
  onSecondaryButtonClick?: MouseEventHandler
}
