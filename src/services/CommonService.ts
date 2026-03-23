/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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

import { getApiBase, getAssetBase } from './EnvironmentService'
import i18next from 'i18next'
import type { AppMarketplaceApp, AppMarketplaceCard } from 'features/apps/types'
import type { ImageType } from '@arena2036/portal-shared-components-construct-x'
import { fetchImageWithToken } from './ImageService'
import type { RoleDescData } from 'components/pages/RoleDetails'
import type { RolesData } from 'features/companyRoles/companyRoleApiSlice'

const getName = (app: AppMarketplaceApp) => app.name ?? ''
const getDescription = (app: AppMarketplaceApp) =>
  app.shortDescription === 'ERROR' ? '' : app.shortDescription

const onClick = (app: AppMarketplaceApp) =>
  app.uri ? () => window.open(app.uri, '_blank')?.focus() : undefined

const getPrice = (app: AppMarketplaceApp) =>
  app.price === 'ERROR' ? '' : app.price

const appToCard = (app: AppMarketplaceApp): AppMarketplaceCard => ({
  ...app,
  subtitle: app.provider,
  title: getName(app),
  description: getDescription(app),
  price: getPrice(app),
  onClick: onClick(app),
  image: {
    src: getPictureURL(app.id, app.leadPictureId ?? ''),
    alt: app.title,
  },
})

const imagesAndAppidToImageType = (
  images: string[],
  appId: string
): ImageType[] =>
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  images?.map((image: any) => ({
    url: getPictureURL(appId, image.documentId ?? image),
    text: 'Construct-X',
    loader: fetchImageWithToken,
  }))

const getPictureURL = (appId: string, docId: string) =>
  docId === '00000000-0000-0000-0000-000000000000'
    ? ''
    : `${getApiBase()}/api/apps/${appId}/appDocuments/${docId}`

const isValidPictureId = (id: string) => {
  return id === '00000000-0000-0000-0000-000000000000'
    ? '00000000-0000-0000-0000-000000000001'
    : id
}

const getRoleDescription = (callback: (data: RoleDescData[]) => void) => {
  const url = `${getAssetBase()}/content/${
    i18next.language
  }/roledescription.json`
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      callback(data)
    })
    .catch((err) => {
      console.log(err)
    })
}

const getCompanyRoleUpdateData = (callback: (data: RolesData) => void) => {
  const url = `${getAssetBase()}/content/${
    i18next.language
  }/companyRoleChange.json`
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      callback(data)
    })
    .catch((error: unknown) => {
      console.log('Fetching Company Roles Data Failed', error)
    })
}

const CommonService = {
  appToCard,
  isValidPictureId,
  imagesAndAppidToImageType,
  getRoleDescription,
  getCompanyRoleUpdateData,
}

export default CommonService
