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

import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { PartnerNetworkApi } from '../../partnerNetwork/api'
import { Api as AppsApi } from 'features/apps/marketplaceDeprecated/api'
import { Api as UserApi } from 'features/admin/userDeprecated/api'
import { apiSlice } from 'features/info/news/apiSlice'
import {
  actionToSearchItem,
  appToSearchItem,
  businessPartnerToSearchItem,
  newsToSearchItem,
  overlayToSearchItem,
  pageToSearchItem,
  userToSearchItem,
} from './mapper'
import { name, type SearchItem } from './types'
import type { CardItems, PaginResult } from '@catena-x/portal-shared-components'
import { isUUID, Patterns } from 'types/Patterns'
import type {
  BusinessPartner,
  BusinessPartnerResponse,
} from 'features/partnerNetwork/types'
import type { TenantUser } from 'features/admin/userApiSlice'
import I18nService from 'services/I18nService'
import {
  hasAccess,
  hasAccessAction,
  hasAccessOverlay,
} from 'services/AccessService'
import { initialPaginResult } from 'types/MainTypes'
import type { AppMarketplaceApp } from 'features/apps/types'

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

// Add an ESLint exception until there is a solution
// eslint-disable-next-line
const searchForExpression = async function (expr: string, dispatch: any) {
  if (!expr || expr.length < 3) {
    return await Promise.all([
      emptyPageResult,
      emptyOverlayResult,
      emptyActionResult,
      emptyAppResult,
      emptyPartnerResult,
      emptyNewsResult,
      emptyUserResult,
    ])
  } else if (Patterns.prefix.BPN.test(expr)) {
    return await Promise.all([
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
    return await Promise.all([
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
    return await Promise.all([
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
    return await Promise.all([
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
      dispatch(apiSlice.endpoints.getItems.initiate())
        .unwrap()
        .then((response: SearchItem) => {
          return response
        })
        .catch(() => {
          return emptyNewsResult
        }),
      UserApi.getInstance()
        .getTenantUsers()
        .catch(() => emptyUserResult),
    ])
  }
}

const clearSearch = createAction(`${name}/clear`)

const fetchSearch = createAsyncThunk(
  `${name}/fetch`,
  async (expr: string, { dispatch }): Promise<SearchItem[]> => {
    const trexpr = expr.trim()
    const searchExpr = new RegExp(trexpr, 'i')
    const uuid = isUUID(trexpr)
    try {
      const [pages, overlays, actions, apps, partners, news, users] =
        await searchForExpression(trexpr, dispatch)
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
            uuid
              ? searchExpr.exec(item.id)
              : ((item.name && searchExpr.exec(item.name)) ??
                (item.provider && searchExpr.exec(item.provider)))
          )
          .map((item: AppMarketplaceApp) => appToSearchItem(item)),
        // Add an ESLint exception until there is a solution
        // eslint-disable-next-line
        partners.content.map((item: any) => businessPartnerToSearchItem(item)),
        news
          .filter(
            (item: CardItems) =>
              searchExpr.exec(item.title) ??
              (item.subtitle && searchExpr.exec(item.subtitle)) ??
              (item.description && searchExpr.exec(item.description))
          )
          .map((item: CardItems) => newsToSearchItem(item)),
        users.content
          .filter((item: TenantUser) =>
            uuid
              ? (searchExpr.exec(item.userEntityId) ??
                searchExpr.exec(item.companyUserId))
              : (searchExpr.exec(item.firstName) ??
                searchExpr.exec(item.lastName) ??
                searchExpr.exec(item.email))
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
