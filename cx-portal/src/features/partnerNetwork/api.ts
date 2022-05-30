import qs from 'querystring'
import { HttpClient } from 'utils/HttpClient'
import { BusinessPartnerResponse, BusinessPartner } from './types'
import { getBpdmApiBase } from 'services/EnvironmentService'
import { getHeaders } from 'services/RequestService'
import { SearchParams } from 'types/MainTypes'

// Instance of BPDM API endpoint
export class PartnerNetworkApi extends HttpClient {
  private static classInstance?: PartnerNetworkApi

  public constructor() {
    super(getBpdmApiBase())
  }

  // To avoid create an instance everytime, pointed to Singleton of static value
  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new PartnerNetworkApi()
    }
    return this.classInstance
  }

  public getAllBusinessPartner = (filters: SearchParams) =>
    this.instance.get<BusinessPartnerResponse>(
      `/catena/business-partner?${qs.stringify(filters)}`,
      getHeaders()
    )

  public getBusinessPartnerByBpn = (bpn: string) =>
    this.instance.get<BusinessPartner>(
      `/catena/business-partner/${bpn}?idType=BPN`,
      getHeaders()
    )
}
