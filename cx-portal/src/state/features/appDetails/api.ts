import UserService from 'services/UserService'
import { getApiBase } from 'services/EnvironmentService'
import { HttpClient } from 'utils/HttpClient'
import { AppDetails } from './types'

export class AppDetailsApi extends HttpClient {
  private static classInstance?: AppDetailsApi

  public constructor() {
    super(getApiBase())
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new AppDetailsApi()
    }
    return this.classInstance
  }

  public getItem = (appId: string) => {
    return this.instance.get<AppDetails>(`/api/apps/${appId}/details.json`, {
      headers: {
        authorization: `Bearer ${UserService.getToken()}`,
      },
    })
  }
}
