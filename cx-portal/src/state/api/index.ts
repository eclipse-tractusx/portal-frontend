import { loadApps } from 'state/features/apps/apps'
import { PartnerNetworkApi } from 'state/api/partnerNetwork/partnerNetworkApi'
import { UserAdministrationApi } from './userAdministration/userAdministrationAPI'
import { AppMarketplaceApi } from './appMarketplace/appMarketplace'
import { NewsApi } from 'state/features/news/api'
import { DigitalTwinApi } from 'state/features/digitalTwins/api'

const api = {
  loadApps: loadApps,
  PartnerNetworkApi,
  UserAdministrationApi,
  AppMarketplaceApi,
  NewsApi,
  DigitalTwinApi,
}

export { api }
