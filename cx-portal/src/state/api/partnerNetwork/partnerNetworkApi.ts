import { HttpClient } from 'utils/HttpClient'
import {
  SearchParams,
  BusinessPartnerResponse,
  BusinessPartner,
} from 'types/partnerNetwork/PartnerNetworkTypes'
import qs from 'querystring'

// Instance of BPDM API endpoint
export class PartnerNetworkApi extends HttpClient {
  private static classInstance?: PartnerNetworkApi

  // TODO: Token needs to read from Redux store
  public constructor(token: string) {
    super(`${process.env.REACT_APP_BPDM_API_BASE_URL}`, {
      Authorization: `Bearer ${token}`,
    })
  }

  // To avoid create an instance everytime, pointed to Singleton of static value
  public static getInstance(token: string) {
    if (!this.classInstance) {
      this.classInstance = new PartnerNetworkApi(token)
    }

    return this.classInstance
  }

  public getAllBusinessPartner = (filters: SearchParams) => {
    const params = qs.stringify(filters)
    return this.instance.get<BusinessPartnerResponse>(
      `/catena/business-partner?${params}`
    )
  }

  public getBusinessPartnerByBpn = (bpn: string) => {
    return this.instance.get<BusinessPartner>(
      `/catena/business-partner/${bpn}?idType=BPN`
    )
  }
}
