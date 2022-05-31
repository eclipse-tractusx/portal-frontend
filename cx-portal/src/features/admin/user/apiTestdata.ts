import { getAssetBase } from 'services/EnvironmentService'
import { HttpClient } from 'utils/HttpClient'
import { TenantUser } from './types'

export class Api extends HttpClient {
  private static classInstance?: Api

  public constructor() {
    super(getAssetBase())
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new Api()
    }
    return this.classInstance
  }

  public getTenantUsers = () =>
    this.instance.get<TenantUser[]>(
      `/api/administration/user/owncompany/users.json`
    )
}
