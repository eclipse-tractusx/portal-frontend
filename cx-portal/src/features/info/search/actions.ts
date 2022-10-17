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

import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { PartnerNetworkApi } from '../../partnerNetwork/api'
import { Api as AppsApi } from 'features/apps/marketplaceDeprecated/api'
import { Api as UserApi } from 'features/admin/userDeprecated/api'
import { Api as NewsApi } from 'features/info/news/api'
import {
  actionToSearchItem,
  appToSearchItem,
  businessPartnerToSearchItem,
  newsToSearchItem,
  overlayToSearchItem,
  pageToSearchItem,
  userToSearchItem,
} from './mapper'
import { name, SearchItem } from './types'
import { CardItems, PaginResult } from 'cx-portal-shared-components'
import { Patterns } from 'types/Patterns'
import { AppMarketplaceApp } from 'features/apps/marketplaceDeprecated/types'
import {
  BusinessPartner,
  BusinessPartnerResponse,
} from 'features/partnerNetwork/types'
import { TenantUser } from 'features/admin/userApiSlice'
import I18nService from 'services/I18nService'
import {
  hasAccess,
  hasAccessAction,
  hasAccessOverlay,
} from 'services/AccessService'
import { initialPaginResult } from 'types/MainTypes'

const emptyAppResult: AppMarketplaceApp[] = []
const emptyNewsResult: CardItems[] = []
const emptyPageResult: string[] = []
const emptyOverlayResult: string[] = []
const emptyActionResult: string[] = []
const emptyUserResult: PaginResult<TenantUser> = initialPaginResult
const emptyPartnerResult: BusinessPartnerResponse = {
  totalElements: 0,
  totalPages: 0,
  page: 0,
  contentSize: 0,
  content: [],
}
const getSinglePartnerResult = (partner: BusinessPartner) => ({
  totalElements: 1,
  totalPages: 1,
  page: 0,
  contentSize: 1,
  content: [{ businessPartner: partner }],
})

const searchForExpression = async function (expr: string) {
  if (!expr || expr.length < 3) {
    return Promise.all([
      emptyPageResult,
      emptyOverlayResult,
      emptyActionResult,
      emptyAppResult,
      emptyPartnerResult,
      emptyNewsResult,
      emptyUserResult,
    ])
  } else if (Patterns.prefix.BPN.test(expr)) {
    return Promise.all([
      emptyPageResult,
      emptyOverlayResult,
      emptyActionResult,
      emptyAppResult,
      Patterns.BPN.test(expr)
        ? getSinglePartnerResult(
            await PartnerNetworkApi.getInstance().getBusinessPartnerByBpn(
              expr.toUpperCase()
            )
          )
        : emptyPartnerResult,
      emptyNewsResult,
      emptyUserResult,
    ])
  } else if (Patterns.prefix.MAIL.test(expr)) {
    return Promise.all([
      emptyPageResult,
      emptyOverlayResult,
      emptyActionResult,
      emptyAppResult,
      emptyPartnerResult,
      emptyNewsResult,
      Patterns.MAIL.test(expr)
        ? await UserApi.getInstance()
            .getTenantUsers()
            .catch(() => emptyUserResult)
        : emptyUserResult,
    ])
  } else if (Patterns.UUID.test(expr)) {
    return Promise.all([
      emptyPageResult,
      emptyOverlayResult,
      emptyActionResult,
      AppsApi.getInstance()
        .getActive()
        .catch(() => emptyAppResult),
      emptyPartnerResult,
      emptyNewsResult,
      UserApi.getInstance()
        .getTenantUsers()
        .catch(() => emptyUserResult),
    ])
  } else {
    return Promise.all([
      I18nService.searchPages(expr),
      I18nService.searchOverlays(expr),
      I18nService.searchActions(expr),
      AppsApi.getInstance()
        .getActive()
        .catch(() => emptyAppResult),
      PartnerNetworkApi.getInstance()
        .getAllBusinessPartner({
          name: expr,
          page: 0,
          size: 5,
        })
        .catch(() => emptyPartnerResult),
      NewsApi.getInstance()
        .getItems()
        .catch(() => emptyNewsResult),
      UserApi.getInstance()
        .getTenantUsers()
        .catch(() => emptyUserResult),
    ])
  }
}

const clearSearch = createAction(`${name}/clear`)

const fetchSearch = createAsyncThunk(
  `${name}/fetch`,
  async (expr: string): Promise<SearchItem[]> => {
    const trexpr = expr.trim()
    const searchExpr = new RegExp(trexpr, 'gi')
    const isUUID = Patterns.UUID.test(trexpr)
    try {
      const [pages, overlays, actions, apps, partners, news, users] =
        await searchForExpression(trexpr)
      return [
        pages
          .filter((item: string) => hasAccess(item))
          .map((item: string) => pageToSearchItem(item)),
        overlays
          .filter((item: string) => hasAccessOverlay(item))
          .map((item: string) => overlayToSearchItem(item)),
        actions
          .filter((item: string) => hasAccessAction(item))
          .map((item: string) => actionToSearchItem(item)),
        apps
          .filter((item: AppMarketplaceApp) =>
            isUUID
              ? item.id.match(searchExpr)
              : item.title.match(searchExpr) || item.provider.match(searchExpr)
          )
          .map((item: AppMarketplaceApp) => appToSearchItem(item)),
        partners.content.map((item: { businessPartner: BusinessPartner }) =>
          businessPartnerToSearchItem(item.businessPartner)
        ),
        news
          .filter(
            (item: CardItems) =>
              item.title?.match(searchExpr) ||
              item.subtitle?.match(searchExpr) ||
              item.description?.match(searchExpr)
          )
          .map((item: CardItems) => newsToSearchItem(item)),
        users.content
          .filter((item: TenantUser) =>
            isUUID
              ? item.userEntityId?.match(searchExpr) ||
                item.companyUserId.match(searchExpr)
              : item.firstName?.match(searchExpr) ||
                item.lastName?.match(searchExpr) ||
                item.email.match(searchExpr)
          )
          .map((item: TenantUser) => userToSearchItem(item)),
      ].flat()
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`${name}/fetch error`)
    }
  }
)

export { clearSearch, fetchSearch }
