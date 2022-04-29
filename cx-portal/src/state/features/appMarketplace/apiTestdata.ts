import { HttpClient } from 'utils/HttpClient'
import { AppMarketplaceApp } from './types'

export class AppMarketplaceApi extends HttpClient {
  private static classInstance?: AppMarketplaceApi

  public constructor() {
    super(process.env.REACT_APP_BASE_ASSETS || '')
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new AppMarketplaceApi()
    }
    return this.classInstance
  }

  public getItems = () => {
    return this.instance.get<AppMarketplaceApp[]>(`/api/apps/active.json`)
  }
}
