import { loadApps } from 'state/deprecated/apps/apps'
import { PartnerNetworkApi } from 'state/api/partnerNetwork/partnerNetworkApi'
import { UserAdministrationApi } from './userAdministration/userAdministrationAPI'

const api = {
  loadApps: loadApps,
  PartnerNetworkApi,
  UserAdministrationApi
}

export { api }
