import { getApiBase } from 'services/EnvironmentService'
import { HttpClient } from 'utils/HttpClient'
import { getHeaders } from 'services/RequestService'
import { SubscriptionStatusItem } from '../apiSlice'

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
    this.instance.get<SubscriptionStatusItem[]>(
      `/api/apps/subscribed/subscription-status`,
      getHeaders()
    )

  public putItem = (id: string) =>
    this.instance.post<void>(`/api/apps/${id}/subscribe`, null, getHeaders())

  public deleteItem = (id: string) =>
    this.instance.put<void>(`/api/apps/${id}/unsubscribe`, getHeaders())
}
