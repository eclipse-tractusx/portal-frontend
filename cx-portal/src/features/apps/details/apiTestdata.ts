import { getAssetBase } from 'services/EnvironmentService'
import { HttpClient } from 'utils/HttpClient'
import { AppDetails } from './types'

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

  public getItem = (appId: string) =>
    this.instance.get<AppDetails>(`/api/apps/${appId}/details.json`)
}
