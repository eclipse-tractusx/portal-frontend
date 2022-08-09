import { getAssetBase } from 'services/EnvironmentService'
import { HttpClient } from 'utils/HttpClient'
import { AppMarketplaceApp } from './types'

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

  public getActive = () =>
    this.instance.get<AppMarketplaceApp[]>(`/api/apps/active.json`)

  public getLatest = () =>
    this.instance.get<AppMarketplaceApp[]>(`/api/apps/latest.json`)

  public getSubscribed = (all?: boolean) =>
    this.instance.get<AppMarketplaceApp[]>(
      `/api/apps/subscribed.json${all ? '?' : ''}`
    )
}
