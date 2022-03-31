import { HttpClient } from 'utils/HttpClient'
import { AppMarketplaceApp } from 'types/appMarketplace/AppMarketplaceTypes'

// Instance of AppMarketplace API endpoint
export class AppMarketplaceApi extends HttpClient {
  private static classInstance?: AppMarketplaceApi

  // TODO: Token needs to read from Redux store
  public constructor(token: string) {
    super(``, {
      Authorization: `Bearer ${token}`,
    })
  }

  // To avoid create an instance everytime, pointed to Singleton of static value
  public static getInstance(token: string) {
    if (!this.classInstance) {
      this.classInstance = new AppMarketplaceApi(token)
    }

    return this.classInstance
  }

  public getApps = () => {
    return this.instance.get<AppMarketplaceApp[]>(`/testdata/apps.json`)
  }
}
