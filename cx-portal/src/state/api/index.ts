import { loadApps } from 'state/deprecated/apps/apps'
import { PartnerNetworkApi } from 'state/api/partnerNetwork/partnerNetworkApi'

const api = {
  loadApps: loadApps,
  PartnerNetworkApi,
}

export { api }
