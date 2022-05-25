import { CardItems } from 'cx-portal-shared-components'
import { getAssetBase } from 'services/EnvironmentService'
import { HttpClient } from 'utils/HttpClient'

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

  public getItems = () =>
    this.instance.get<CardItems[]>(`/api/news/latest.json`)
}
