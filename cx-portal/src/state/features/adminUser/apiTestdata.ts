import { getAssetBase } from 'services/EnvironmentService'
import { HttpClient } from 'utils/HttpClient'
import { TenantUser } from './types'

export class AdminUserApi extends HttpClient {
  private static classInstance?: AdminUserApi

  public constructor() {
    super(getAssetBase())
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new AdminUserApi()
    }
    return this.classInstance
  }

  public getTenantUsers = () => {
    return this.instance.get<TenantUser[]>(`/api/administration/user/owncompany/users.json`)
  }

}
