import { loadApps } from 'state/features/apps/apps'
import { PartnerNetworkApi } from 'state/api/partnerNetwork/partnerNetworkApi'
import { UserAdministrationApi } from './userAdministration/userAdministrationAPI'
import { AppMarketplaceApi } from './appMarketplace/appMarketplace'

const api = {
  loadApps: loadApps,
  PartnerNetworkApi,
  UserAdministrationApi,
  AppMarketplaceApi,
}

export { api }
