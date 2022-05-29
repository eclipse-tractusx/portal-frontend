import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { PartnerNetworkApi } from '../../partnerNetwork/api'
import { Api as AppsApi } from 'features/apps/marketplace/api'
import { Api as UserApi } from 'features/admin/user/api'
import { Api as NewsApi } from 'features/info/news/api'
import {
  appToSearchItem,
  businessPartnerToSearchItem,
  newsToSearchItem,
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

const emptyAppResult: AppMarketplaceApp[] = []
const emptyNewsResult: CardItems[] = []
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
      emptyAppResult,
      emptyNewsResult,
      emptyUserResult,
      emptyPartnerResult,
    ])
  } else if (Patterns.prefix.BPN.test(expr)) {
    return Promise.all([
      emptyAppResult,
      emptyNewsResult,
      emptyUserResult,
      Patterns.BPN.test(expr)
        ? getSinglePartnerResult(
            await PartnerNetworkApi.getInstance().getBusinessPartnerByBpn(
              expr.toUpperCase()
            )
          )
        : emptyPartnerResult,
    ])
  } else {
    return Promise.all([
      await AppsApi.getInstance().getActive(),
      await NewsApi.getInstance().getItems(),
      await UserApi.getInstance().getTenantUsers(),
      await PartnerNetworkApi.getInstance().getAllBusinessPartner({
        name: expr,
        page: 0,
        size: 5,
      }),
    ])
  }
}

const clearSearch = createAction(`${name}/clear`)

const fetchSearch = createAsyncThunk(
  `${name}/fetch`,
  async (expr: string): Promise<SearchItem[]> => {
    const searchExpr = new RegExp(expr, 'gi')
    try {
      let [apps, news, users, partners] = await searchForExpression(expr.trim())
      return [
        apps
          .filter(
            (item) =>
              item.title.match(searchExpr) || item.provider.match(searchExpr)
          )
          .map((item) => appToSearchItem(item)),
        news
          .filter(
            (item) =>
              item.title.match(searchExpr) ||
              item.subtitle?.match(searchExpr) ||
              item.description?.match(searchExpr)
          )
          .map((item) => newsToSearchItem(item)),
        users
          .filter(
            (item) =>
              item.firstName.match(searchExpr) ||
              item.lastName.match(searchExpr) ||
              item.email.match(searchExpr)
          )
          .map((item) => userToSearchItem(item)),
        partners.content.map((item) =>
          businessPartnerToSearchItem(item.businessPartner)
        ),
      ].flat()
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`${name}/fetch error`)
    }
  }
)

export { clearSearch, fetchSearch }
