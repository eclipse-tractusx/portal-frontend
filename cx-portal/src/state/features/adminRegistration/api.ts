import UserService from 'services/UserService'
import { getApiBase } from 'services/EnvironmentService'
import { HttpClient } from 'utils/HttpClient'
import { InviteData, CompanyDetail } from './types'

export class AdminRegistrationApi extends HttpClient {
  private static classInstance?: AdminRegistrationApi

  public constructor() {
    super(getApiBase())
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new AdminRegistrationApi()
    }

    return this.classInstance
  }

  public inviteBusinessPartner = (invite: InviteData) => {
    return this.instance.post<void>(
      '/api/administration/invitation',
      JSON.stringify(invite),
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
          'content-type': 'application/json',
        },
      }
    )
  }

  public getCompanyDetail = (applicationId: string) => {
    return this.instance.get<CompanyDetail>(
      `/api/administration/registration/application/${applicationId}/companyDetailsWithAddress`,
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
  }
}
