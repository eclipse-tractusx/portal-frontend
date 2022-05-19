import { getApiBase } from 'services/EnvironmentService'
import UserService from 'services/UserService'
import { HttpClient } from 'utils/HttpClient'
import { TenantUser, AddUser } from './types'

export class AdminUserApi extends HttpClient {
  private static classInstance?: AdminUserApi

  public constructor() {
    super(getApiBase())
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new AdminUserApi()
    }

    return this.classInstance
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

  public addTenantUsers = (users: AddUser[]) => {
    return this.instance.post<AddUser[]>(
      `/api/administration/user/tenant/${UserService.getTenant()}/users`,
      users,
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
  }
}
