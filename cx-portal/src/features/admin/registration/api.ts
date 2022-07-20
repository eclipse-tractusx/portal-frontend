import { getApiBase } from 'services/EnvironmentService'
import { HttpClient } from 'utils/HttpClient'
import { CompanyDetail } from './types'
import { getHeaders } from 'services/RequestService'
import { SearchParams } from '../../connector/types'
import qs from 'querystring'

export class Api extends HttpClient {
  private static classInstance?: Api

  public constructor() {
    super(getApiBase())
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new Api()
    }

    return this.classInstance
  }

  public getRegistrationRequests = (filters: SearchParams) =>
    this.instance.post<void>(
      `/api/administration/registration/applications?${qs.stringify(filters)}`,
      getHeaders()
    )

  public getCompanyDetail = (applicationId: string) =>
    this.instance.get<CompanyDetail>(
      `/api/administration/registration/application/${applicationId}/companyDetailsWithAddress`,
      getHeaders()
    )
}
