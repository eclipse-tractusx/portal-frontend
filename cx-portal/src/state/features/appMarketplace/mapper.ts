import { CardItems } from 'cx-portal-shared-components'
import { AppMarketplaceApp } from './types'

//const baseAssets = process.env.REACT_APP_BASE_ASSETS
const baseAssets = 'https://portal-dev.demo.catena-x.net/assets'

export const appToCard = (app: AppMarketplaceApp): CardItems => ({
  ...app,
  subtitle: app.provider,
  description: app.shortDescription,
  image: {
    src:
      !app.leadPictureUri || app.leadPictureUri === 'ERROR'
        ? ''
        : app.leadPictureUri.startsWith('https://')
        ? app.leadPictureUri
        : `${baseAssets}/images/apps/${app.id}/${app.leadPictureUri}`,
    alt: app.title,
  },
  onClick: () => {
    document.location.href = app.link || '/notfound'
  },
})
