import { CardItems } from 'cx-portal-shared-components'
import { getAssetBase } from 'services/EnvironmentService'
import { AppMarketplaceApp } from './types'

const baseAssets = getAssetBase()

export const getAppImage = (app: AppMarketplaceApp): string =>
  !app.leadPictureUri || app.leadPictureUri === 'ERROR'
    ? `${baseAssets}/images/apps/default/lead.png`
    : app.leadPictureUri.startsWith('https://')
    ? app.leadPictureUri
    : `${baseAssets}/images/apps/${app.id}/${app.leadPictureUri}`

export const appToCard = (app: AppMarketplaceApp): CardItems => ({
  ...app,
  subtitle: app.provider,
  description: app.shortDescription === 'ERROR' ? '' : app.shortDescription,
  price: app.price === 'ERROR' ? '' : app.price,
  image: {
    src: getAppImage(app),
    alt: app.title,
  },
  onClick: app.link
    ? () => {
        // same tab
        // document.location.href = app.link || '/notfound'
        // new tab
        window.open(app.link, '_blank')?.focus()
      }
    : undefined,
})
