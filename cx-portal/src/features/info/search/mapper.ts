/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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

import { CardItems } from 'cx-portal-shared-components'
import { TenantUser } from 'features/admin/userApiSlice'
import { AppMarketplaceApp } from 'features/apps/marketplaceDeprecated/types'
import { BusinessPartner } from 'features/partnerNetwork/types'
import { SearchCategory, SearchItem } from './types'

export const pageToSearchItem = (item: string): SearchItem => ({
  id: item,
  category: SearchCategory.PAGE,
  title: `pages.${item}`,
})

export const overlayToSearchItem = (item: string): SearchItem => ({
  id: item,
  category: SearchCategory.OVERLAY,
  title: `overlays.${item}`,
})

export const actionToSearchItem = (item: string): SearchItem => ({
  id: item,
  category: SearchCategory.ACTION,
  title: `actions.${item}`,
})

export const appToSearchItem = (item: AppMarketplaceApp): SearchItem => ({
  ...item,
  category: SearchCategory.APP,
  description: item.provider,
})

export const businessPartnerToSearchItem = (
  item: BusinessPartner
): SearchItem => ({
  id: item.bpn,
  category: SearchCategory.PARTNER,
  title: item.names[0]?.value,
  description: item.bpn,
})

export const newsToSearchItem = (item: CardItems): SearchItem => ({
  id: item.id || '0',
  category: SearchCategory.NEWS,
  title: item.title,
  description: item.subtitle,
})

export const userToSearchItem = (item: TenantUser): SearchItem => ({
  id: item.companyUserId,
  category: SearchCategory.USER,
  title: `${item.firstName || ''} ${item.lastName || ''}`,
  description: item.email,
})
