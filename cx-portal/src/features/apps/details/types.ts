import { AppMarketplaceApp } from 'features/apps/marketplaceDeprecated/types'

export const name = 'apps/details'

export type AppDetails = AppMarketplaceApp & {
  providerUri: string
  contactEmail: string
  contactNumber: string
  detailPictureUris: string[]
  longDescription: string
  isSubscribed: string
  tags: string[]
  languages: string[]
}

export type AppDetailsState = {
  item: AppDetails
  loading: boolean
  error: string
}

export const AppDetailInitial = {
  id: 'default',
  title: '',
  provider: '',
  leadPictureUri: 'trans.png',
  shortDescription: '',
  useCases: [''],
  price: '',
  providerUri: '',
  contactEmail: '',
  contactNumber: '',
  detailPictureUris: [''],
  longDescription: '',
  isSubscribed: '',
  tags: [''],
  languages: [''],
}

export const initialState: AppDetailsState = {
  item: AppDetailInitial,
  loading: true,
  error: '',
}
