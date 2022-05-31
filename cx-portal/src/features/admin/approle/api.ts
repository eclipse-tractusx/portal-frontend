import { getApiBase } from 'services/EnvironmentService'
import { getHeaders } from 'services/RequestService'
import { HttpClient } from 'utils/HttpClient'
import { AppRole } from './types'

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

  public getItems = (appId: string) =>
    this.instance.get<AppRole[]>(
      `/api/administration/user/${appId}/roles?status=ACTIVE`,
      getHeaders()
    )
}
