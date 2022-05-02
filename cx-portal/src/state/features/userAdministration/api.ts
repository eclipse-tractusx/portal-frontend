import UserService from 'services/UserService'
import { HttpClient } from 'utils/HttpClient'
import { TenantUser, InviteData, AddUser } from './types'

export class UserAdministrationApi extends HttpClient {
  private static classInstance?: UserAdministrationApi

  public constructor() {
    super(process.env.REACT_APP_BASE_API || '')
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new UserAdministrationApi()
    }

    return this.classInstance
  }

  public inviteBusinessPartner = (invite: InviteData) => {
    return this.instance.post<void>(
      '/api/useradministration/invitation',
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
      `/api/useradministration/tenant/${UserService.getTenant()}/users`,
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
  }

  public addTenantUsers = (users: AddUser[]) => {
    return this.instance.post<AddUser[]>(
      `/api/useradministration/tenant/${UserService.getTenant()}/users`,
      users,
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
  }
}
