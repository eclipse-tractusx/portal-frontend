import { getApiBase } from 'services/EnvironmentService'
import { HttpClient } from 'utils/HttpClient'
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

  public getItems = () =>
    this.instance.get<string[]>(`/api/apps/favourites`, getHeaders())

  public putItem = (id: string) =>
    this.instance.post<string[]>(
      `/api/apps/${id}/favourite`,
      null,
      getHeaders()
    )

  public deleteItem = (id: string) =>
    this.instance.delete<string[]>(`/api/apps/${id}/favourite`, getHeaders())
}
