import { Nullable } from 'types/MainTypes'

export type AppDetails = {
  id: string
  name: string
  leadPictureURI: string
  providerURI: string
  provider: string
  contactEmail: string
  contactNumber: string
  detailPictures: string[]
  useCases: string[]
  languages: string[]
  descriptionLong: string
  price: string
  rating: number
  purchased: boolean
  tags: string[]
}

export type AppDetailsState = {
  item: Nullable<AppDetails>
  loading: boolean
  error: string
}
