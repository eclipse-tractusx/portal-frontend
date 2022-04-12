import { loadApps } from 'state/features/apps/apps'
import { PartnerNetworkApi } from 'state/api/partnerNetwork/partnerNetworkApi'
import { UserAdministrationApi } from './userAdministration/userAdministrationAPI'
import { AppMarketplaceApi } from './appMarketplace/appMarketplace'
import { NewsApi } from 'state/features/news/api'

const api = {
  loadApps: loadApps,
  PartnerNetworkApi,
  UserAdministrationApi,
  AppMarketplaceApi,
  NewsApi,
}

export { api }
