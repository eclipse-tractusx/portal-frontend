import UserService from 'services/UserService'
import { getApiBase } from 'services/EnvironmentService'
import { HttpClient } from 'utils/HttpClient'
import { TenantUser, InviteData, CompanyDetail } from './types'

export class UserAdministrationApi extends HttpClient {
  private static classInstance?: UserAdministrationApi

  public constructor() {
    super(getApiBase() || '')
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new UserAdministrationApi()
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

  public getTenantUsers = () => {
    return this.instance.get<TenantUser[]>(
      `/api/administration/user/tenant/${UserService.getTenant()}/users`,
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
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
