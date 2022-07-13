import { getApiBase } from 'services/EnvironmentService'
import { getHeaders } from 'services/RequestService'
import { HttpClient } from 'utils/HttpClient'
import { OwnUser } from './types'

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

  public getUserOwn = () =>
    this.instance.get<OwnUser>(`/api/administration/user/ownuser`, getHeaders())

  public getUserInfo = (companyUserId: string) =>
    this.instance.get<OwnUser>(
      `/api/administration/user/ownCompany/users/${companyUserId}`,
      getHeaders()
    )

  public resetPassword = (companyUserId: string) =>
    this.instance.put<any>(
      `/api/administration/user/ownCompany/users/${companyUserId}/resetPassword`,
      {},
      getHeaders()
    )

  public addBusinessPartnerNumber = (companyUserId: string, bpn: string) =>
    this.instance.put<any>(
      `/api/administration/user/ownCompany/users/${companyUserId}/businessPartnerNumbers/${bpn}`,
      {},
      getHeaders()
    )
}
