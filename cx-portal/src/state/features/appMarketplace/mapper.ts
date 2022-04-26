import { CardItems } from 'cx-portal-shared-components'
import { AppMarketplaceApp } from './types'

export const appToCard = (app: AppMarketplaceApp): CardItems => ({
  ...app,
  subtitle: app.provider,
  description: app.shortDescription,
  image: {
    src: app.leadPictureUri,
    alt: app.title,
  },
})
