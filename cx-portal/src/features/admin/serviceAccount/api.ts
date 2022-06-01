import { getApiBase } from 'services/EnvironmentService'
import { getHeaders } from 'services/RequestService'
import { PAGE_SIZE, PaginResult } from 'types/MainTypes'
import { HttpClient } from 'utils/HttpClient'
import { ServiceAccount } from './types'

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

  public getItems = (page: number) =>
    this.instance.get<PaginResult<ServiceAccount>>(
      `/api/administration/serviceaccount/owncompany/serviceaccounts?page=${page}&size=${PAGE_SIZE}`,
      getHeaders()
    )
}
