import { getApiBase } from 'services/EnvironmentService'
import { HttpClient } from 'utils/HttpClient'
import { AppDetails } from './types'
import i18next from 'i18next'
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

  public getItem = (appId: string) =>
    this.instance.get<AppDetails>(
      `/api/apps/${appId}?lang=${i18next.language}`,
      getHeaders()
    )
}
