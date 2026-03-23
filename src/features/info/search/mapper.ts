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

import type { CardItems } from '@arena2036/portal-shared-components-construct-x'
import type { TenantUser } from 'features/admin/userApiSlice'
import type { AppMarketplaceApp } from 'features/apps/types'
import type { BusinessPartner } from 'features/partnerNetwork/types'
import { SearchCategory, type SearchItem } from './types'

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
  title: item.name ?? '-',
})

export const businessPartnerToSearchItem = (
  item: BusinessPartner
): SearchItem => ({
  id: item.bpnl,
  category: SearchCategory.PARTNER,
  title: item.legalName,
  description: item.bpnl,
})

export const newsToSearchItem = (item: CardItems): SearchItem => ({
  id: item.id ?? '0',
  category: SearchCategory.NEWS,
  title: item.title,
  description: item.subtitle,
})

export const userToSearchItem = (item: TenantUser): SearchItem => ({
  id: item.companyUserId,
  category: SearchCategory.USER,
  title: `${item.firstName ?? ''} ${item.lastName ?? ''}`,
  description: item.email,
})
