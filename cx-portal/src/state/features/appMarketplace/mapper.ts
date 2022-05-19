import { CardItems, ImageType } from 'cx-portal-shared-components'
import { getAssetBase } from 'services/EnvironmentService'
import { AppMarketplaceApp } from './types'

const baseAssets = getAssetBase()

export const getAppLeadImage = (app: AppMarketplaceApp): string =>
  !app.leadPictureUri || app.leadPictureUri === 'ERROR'
    ? `${baseAssets}/images/apps/default/lead.png`
    : app.leadPictureUri.startsWith('https://')
      ? app.leadPictureUri
      : `${baseAssets}/images/apps/${app.id}/${app.leadPictureUri}`

export const getAppImage = (appid: string, image: string): ImageType => ({
  text: "image caption",
  url: image.startsWith('https://')
    ? image
    : `${baseAssets}/images/apps/${appid}/${image}`
})


export const appToCard = (app: AppMarketplaceApp): CardItems => ({
  ...app,
  subtitle: app.provider,
  description: app.shortDescription === 'ERROR' ? '' : app.shortDescription,
  price: app.price === 'ERROR' ? '' : app.price,
  image: {
    src: getAppLeadImage(app),
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
