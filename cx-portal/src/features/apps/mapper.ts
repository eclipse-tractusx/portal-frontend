import { CardItems, ImageType } from 'cx-portal-shared-components'
import { getAssetBase } from 'services/EnvironmentService'
import {
  AppMarketplaceApp,
  SubscriptionStatus,
  SubscriptionStatusItem,
} from './apiSlice'

const baseAssets = getAssetBase()

export const getAppLeadImage = (app: AppMarketplaceApp): string => {
  if (!app.leadPictureUri || app.leadPictureUri === 'ERROR')
    return `${baseAssets}/images/apps/default/lead.png`
  if (app.leadPictureUri.startsWith('https://')) return app.leadPictureUri
  return `${baseAssets}/images/apps/${app.id}/${app.leadPictureUri}`
}

export const getAppImage = (appid: string, image: string): ImageType => ({
  text: 'image caption',
  url: image.startsWith('https://')
    ? image
    : `${baseAssets}/images/apps/${appid}/${image}`,
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
    ? () => window.open(app.link, '_blank')?.focus()
    : undefined,
})

export const filterSubscribed = (
  apps: AppMarketplaceApp[],
  subscriptionStatus: SubscriptionStatusItem[]
) => {
  if (
    !apps ||
    apps.length === 0 ||
    !subscriptionStatus ||
    subscriptionStatus.length === 0
  )
    return []
  const subscribed = subscriptionStatus
    .filter(
      (status: SubscriptionStatusItem) =>
        status.offerSubscriptionStatus === SubscriptionStatus.ACTIVE
    )
    .map((status: SubscriptionStatusItem) => status.appId)
  return apps
    .filter((app: AppMarketplaceApp) => subscribed?.includes(app.id))
    .map(appToCard)
}

export const appToStatus = (
  apps: AppMarketplaceApp[],
  subscriptionStatus: SubscriptionStatusItem[]
): AppMarketplaceApp[] => {
  return apps?.map((app: AppMarketplaceApp) => {
    const status = subscriptionStatus?.find(
      (e) => e.appId === app.id
    )?.offerSubscriptionStatus
    const image = {
      src: getAppLeadImage(app),
      alt: app.title,
    }
    return { ...app, status, image }
  })
}
