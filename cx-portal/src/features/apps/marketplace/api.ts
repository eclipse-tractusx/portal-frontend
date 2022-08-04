import { getApiBase } from 'services/EnvironmentService'
import { HttpClient } from 'utils/HttpClient'
import { AppMarketplaceApp } from './types'
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

  public getSubscribed = (all?: boolean) =>
    this.instance.get<AppMarketplaceApp[]>(
      `/api/apps/subscribed${all ? '?all===true' : ''}`,
      getHeaders()
    )
}
