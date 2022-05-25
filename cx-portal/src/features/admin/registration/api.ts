import { getApiBase } from 'services/EnvironmentService'
import { HttpClient } from 'utils/HttpClient'
import { InviteData, CompanyDetail } from './types'
import { getHeaders } from 'services/RequestService'

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

  public postInviteBusinessPartner = (invite: InviteData) =>
    this.instance.post<void>(
      '/api/administration/invitation',
      invite,
      getHeaders()
    )

  public getCompanyDetail = (applicationId: string) =>
    this.instance.get<CompanyDetail>(
      `/api/administration/registration/application/${applicationId}/companyDetailsWithAddress`,
      getHeaders()
    )
}
