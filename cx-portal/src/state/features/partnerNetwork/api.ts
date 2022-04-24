import { HttpClient } from 'utils/HttpClient'
import { SearchParams, BusinessPartnerResponse, BusinessPartner } from './types'
import qs from 'querystring'
import UserService from 'services/UserService'

// Instance of BPDM API endpoint
export class PartnerNetworkApi extends HttpClient {
  private static classInstance?: PartnerNetworkApi

  // TODO: Token needs to read from Redux store
  public constructor() {
    super(process.env.REACT_APP_BASE_API_BPDM || '')
  }

  // To avoid create an instance everytime, pointed to Singleton of static value
  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new PartnerNetworkApi()
    }
    return this.classInstance
  }

  public getAllBusinessPartner = (filters: SearchParams) => {
    const params = qs.stringify(filters)
    return this.instance.get<BusinessPartnerResponse>(
      `/catena/business-partner?${params}`,
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
  }

  public getBusinessPartnerByBpn = (bpn: string) => {
    return this.instance.get<BusinessPartner>(
      `/catena/business-partner/${bpn}?idType=BPN`,
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
  }
}
