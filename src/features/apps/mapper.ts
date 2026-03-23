/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import {
  type CardItems,
  type ImageType,
  LogoGrayData,
} from '@arena2036/portal-shared-components-construct-x'
import type { ProvidedServiceType } from 'features/serviceManagement/apiSlice'
import { getApiBase, getAssetBase } from 'services/EnvironmentService'
import {
  type ActiveSubscription,
  type AppMarketplaceApp,
  type SubscriptionStatusItem,
  SubscriptionStatus,
  SubscriptionStatusText,
} from './types'

const baseAssets = getAssetBase()

export const getAppImageUrl = ({
  id,
  leadPictureId,
}: {
  id: string
  leadPictureId: string
}) =>
  leadPictureId
    ? `${getApiBase()}/api/apps/${id}/appDocuments/${leadPictureId}`
    : LogoGrayData

// mapper to fetch an app lead-image from the asset repo by using the app image name; default image handling included as well
export const getAppLeadImage = (app: AppMarketplaceApp): string => {
  if (!app.leadPictureUri || app.leadPictureUri === 'ERROR')
    return `${baseAssets}/images/apps/default/lead.png`
  if (app.leadPictureUri.startsWith('https://')) return app.leadPictureUri
  return `${baseAssets}/images/apps/${app.id}/${app.leadPictureUri}`
}

// mapper to fetch an app image from the asset repo by using the app image name, without default image handling
export const getAppImage = (appid: string, image: string): ImageType => ({
  text: 'image caption',
  url: image.startsWith('https://')
    ? image
    : `${baseAssets}/images/apps/${appid}/${image}`,
})

// mapper to create the app card used for the my business application section
export const appToCard = (app: AppMarketplaceApp): CardItems => ({
  ...app,
  subtitle: app.provider,
  title: app.name ?? '',
  description: app.shortDescription === 'ERROR' ? '' : app.shortDescription,
  price: app.price === 'ERROR' ? '' : app.price,
  image: {
    src: getAppImageUrl({
      id: app.id,
      leadPictureId: app.leadPictureUri ?? app.leadPictureId,
    }),
    alt: app.title,
  },
  onClick: app.uri ? () => window.open(app.uri, '_blank')?.focus() : undefined,
})

export const serviceToCard = (app: ProvidedServiceType): CardItems => ({
  ...app,
  statusText: app.status,
  subtitle: app.provider,
  title: app.name ?? '',
  image: {
    src: app.leadPictureId
      ? `${getApiBase()}/api/administration/documents/${app.leadPictureId}`
      : LogoGrayData,
    alt: app.name,
  },
})

// mapper to create the app card used for the app access management view on the user management page
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
        status.status === SubscriptionStatus.ACTIVE
    )
    .map((status: SubscriptionStatusItem) => status.offerId)
  return apps
    .filter((app: AppMarketplaceApp) => subscribed?.includes(app.id))
    .map(appToCard)
}

export const appToStatus = (apps: AppMarketplaceApp[]): AppMarketplaceApp[] => {
  return apps
    ?.map((app: AppMarketplaceApp) => {
      const status = SubscriptionStatus.ACTIVE
      const image = {
        src: getAppImageUrl({ id: app.id, leadPictureId: app.leadPictureUri }),
        alt: app.title,
      }
      return { ...app, status, image }
    })
    .filter((e) => e.status)
}

export const subscribedApps = (apps: ActiveSubscription[]) => {
  return apps?.map((app: ActiveSubscription) => {
    const status = SubscriptionStatus.ACTIVE
    const image = {
      src: getAppImageUrl({ id: app.offerId, leadPictureId: app.image }),
      alt: app.name,
    }
    return { ...app, status, image }
  })
}

export const appCardStatus = (apps: AppMarketplaceApp[]): CardItems[] => {
  if (!apps || apps.length === 0) return []
  return apps
    ?.map((app: AppMarketplaceApp) => {
      const status = app.status?.toLocaleLowerCase() as
        | SubscriptionStatus
        | undefined
      const statusText = SubscriptionStatusText[app.status!] || app.status
      const title = app.name!
      return { ...app, title, status, statusText }
    })
    .filter((e) => e.status)
}

export const appCardRecentlyApps = (apps: AppMarketplaceApp[]): CardItems[] => {
  if (!apps || apps.length <= 6) return []
  const recentlyData = apps
    .filter((e) => e.lastChanged)
    .map((e) => {
      const timestamp = new Date(e.lastChanged!).getTime()
      return { ...e, timestamp }
    })
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 4)
  return appCardStatus(recentlyData)
}
