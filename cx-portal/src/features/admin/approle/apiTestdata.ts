import { getAssetBase } from 'services/EnvironmentService'
import { HttpClient } from 'utils/HttpClient'
import { AppRole } from './types'

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

  public getItems = (appId: string) =>
    this.instance.get<AppRole[]>(
      `/api/administration/user/demo/roles.json?appId=${appId}`
    )
}
