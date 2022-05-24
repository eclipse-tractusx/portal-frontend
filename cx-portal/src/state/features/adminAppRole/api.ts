import { getApiBase } from 'services/EnvironmentService'
import UserService from 'services/UserService'
import { HttpClient } from 'utils/HttpClient'
import { AppRole } from './types'

export class AdminAppRoleApi extends HttpClient {
  private static classInstance?: AdminAppRoleApi

  public constructor() {
    super(getApiBase())
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new AdminAppRoleApi()
    }

    return this.classInstance
  }

  public getItems = (appId: string) => {
    return this.instance.get<AppRole[]>(
      `/api/administration/user/${appId}/roles?status=ACTIVE`,
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
  }
}
