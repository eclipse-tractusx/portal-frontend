import UserService from 'services/UserService'
import { getApiBase } from 'services/EnvironmentService'
import { HttpClient } from 'utils/HttpClient'
import { AppMarketplaceApp } from './types'

export class AppMarketplaceApi extends HttpClient {
  private static classInstance?: AppMarketplaceApi

  public constructor() {
    super(getApiBase())
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new AppMarketplaceApi()
    }
    return this.classInstance
  }

  public getItems = () => {
    return this.instance.get<AppMarketplaceApp[]>(`/api/apps/active`, {
      headers: {
        authorization: `Bearer ${UserService.getToken()}`,
      },
    })
  }

  public getSubscribed = (all?: boolean) => {
    return this.instance.get<AppMarketplaceApp[]>(
      `/api/apps/subscribed${all ? '?all===true' : ''}`,
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
  }
}
