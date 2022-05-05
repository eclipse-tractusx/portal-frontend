import { CardItems } from 'cx-portal-shared-components'
import { AppMarketplaceApp } from './types'

export const appToCard = (app: AppMarketplaceApp): CardItems => ({
  ...app,
  subtitle: app.provider,
  description: app.shortDescription === 'ERROR' ? '' : app.shortDescription,
  price: app.price === 'ERROR' ? '' : app.price,
  image: {
    src:
      app.leadPictureUri === 'ERROR'
        ? ''
        : `https://portal-dev.demo.catena-x.net/assets/images/apps/${app.id}/${app.leadPictureUri}`,
    alt: app.title,
  },
})
