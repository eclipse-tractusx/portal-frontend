import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { PartnerNetworkApi } from '../../partnerNetwork/api'
import { Api as AppsApi } from 'features/apps/marketplace/api'
import { Api as UserApi } from 'features/admin/user/api'
import { Api as NewsApi } from 'features/info/news/api'
import {
  appToSearchItem,
  businessPartnerToSearchItem,
  newsToSearchItem,
  pageToSearchItem,
  userToSearchItem,
} from './mapper'
import { name, SearchItem } from './types'
import { CardItems } from 'cx-portal-shared-components'
import { Patterns } from 'types/Patterns'
import { AppMarketplaceApp } from 'features/apps/marketplace/types'
import {
  BusinessPartner,
  BusinessPartnerResponse,
} from 'features/partnerNetwork/types'
import { TenantUser } from 'features/admin/user/types'
import I18nService from 'services/I18nService'
import AccessService from 'services/AccessService'

const emptyAppResult: AppMarketplaceApp[] = []
const emptyNewsResult: CardItems[] = []
const emptyPageResult: string[] = []
const emptyUserResult: TenantUser[] = []
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
      emptyAppResult,
      emptyPartnerResult,
      emptyNewsResult,
      emptyUserResult,
    ])
  } else if (Patterns.prefix.BPN.test(expr)) {
    return Promise.all([
      emptyPageResult,
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
    return [
      I18nService.searchPages(expr),
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
    ]
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
      const [pages, apps, partners, news, users] = await searchForExpression(
        trexpr
      )
      return [
        pages
          .filter((item: string) => AccessService.hasAccess(item))
          .map((item: string) => pageToSearchItem(item)),
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
        users
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
