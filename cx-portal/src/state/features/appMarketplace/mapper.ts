import { CardItems } from 'cx-portal-shared-components'
import { AppMarketplaceApp } from './types'

export const appToCard = (app: AppMarketplaceApp): CardItems => ({
  ...app,
  subtitle: app.provider,
  description: app.shortDescription,
  image: app.leadPictureUri
    ? {
        src: app.leadPictureUri,
        alt: app.title,
      }
    : {
        src: `${process.env.REACT_APP_BASE_ASSETS}/images/apps/default/lead.png`,
        alt: app.title,
      },
})
