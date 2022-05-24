import { getAssetBase } from 'services/EnvironmentService'
import { HttpClient } from 'utils/HttpClient'
import { AppRole } from './types'

export class AdminAppRoleApi extends HttpClient {
  private static classInstance?: AdminAppRoleApi

  public constructor() {
    super(getAssetBase())
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new AdminAppRoleApi()
    }
    return this.classInstance
  }

  public getItems = (appId: string) => {
    return this.instance.get<AppRole[]>(
      `/api/administration/user/demo/roles.json?appId=${appId}`
    )
  }
}
