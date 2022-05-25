import { createAsyncThunk } from '@reduxjs/toolkit'
import { PartnerNetworkApi } from '../../partnerNetwork/api'
import { Api as AppsApi } from 'features/apps/marketplace/api'
import { appToSearchItem, businessPartnerToSearchItem } from './mapper'
import { name, SearchItem } from './types'

const fetchSearch = createAsyncThunk(
  `${name}/fetch`,
  async (expr: string): Promise<SearchItem[]> => {
    const searchExpr = new RegExp(expr, 'gi')
    try {
      const [apps, partners] = await Promise.all([
        expr ? await AppsApi.getInstance().getActive() : [],
        await PartnerNetworkApi.getInstance().getAllBusinessPartner({
          name: expr,
          page: 0,
          size: 5,
        }),
      ])
      return [
        apps
          .filter(
            (item) =>
              item.title.match(searchExpr) || item.provider.match(searchExpr)
          )
          .map((item) => appToSearchItem(item)),
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

export { fetchSearch }
