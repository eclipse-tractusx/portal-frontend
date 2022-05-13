import { Nullable } from 'types/MainTypes'
import { AppMarketplaceApp } from '../appMarketplace/types'

export type AppDetails = AppMarketplaceApp & {
  providerUri: string
  contactEmail: string
  contactNumber: string
  detailPictureUris: string[]
  longDescription: string
  isSubscribed: boolean
  tags: string[]
  languages: string[]
}

export type AppDetailsState = {
  item: Nullable<AppDetails>
  loading: boolean
  error: string
}
