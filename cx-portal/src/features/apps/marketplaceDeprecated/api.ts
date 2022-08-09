import { getApiBase } from 'services/EnvironmentService'
import { HttpClient } from 'utils/HttpClient'
import { AppMarketplaceApp, SubscribedApps } from './types'
import { getHeaders } from 'services/RequestService'

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

  public getActive = () =>
    this.instance.get<AppMarketplaceApp[]>(`/api/apps/active`, getHeaders())

  public getLatest = () =>
    this.instance.get<AppMarketplaceApp[]>(`/api/apps/latest`, getHeaders())

  public getSubscriptionStatus = () =>
    this.instance.get<SubscribedApps[]>(
      `/api/Apps/subscribed/subscription-status`,
      getHeaders()
    )
}
