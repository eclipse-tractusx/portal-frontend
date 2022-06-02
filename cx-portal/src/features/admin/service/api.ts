import { getApiBase } from 'services/EnvironmentService'
import { getHeaders } from 'services/RequestService'
import { PAGE_SIZE, PaginResult } from 'types/MainTypes'
import { HttpClient } from 'utils/HttpClient'
import {
  ServiceAccount,
  ServiceAccountCreate,
  ServiceAccountDetail,
} from './types'

export class Api extends HttpClient {
  private static classInstance?: Api

  public constructor() {
    super('')
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new Api()
    }
    return this.classInstance
  }

  public getItems = (page: number) =>
    this.instance.get<PaginResult<ServiceAccount>>(
      `${getApiBase()}/api/administration/serviceaccount/owncompany/serviceaccounts?page=${page}&size=${PAGE_SIZE}`,
      getHeaders()
    )

  public getDetail = (id: string) =>
    this.instance.get<ServiceAccountDetail>(
      `${getApiBase()}/api/administration/serviceaccount/owncompany/serviceaccounts/${id}`,
      getHeaders()
    )

  public postItem = (account: ServiceAccountCreate) =>
    this.instance.post(
      `${getApiBase()}/api/administration/serviceaccount/owncompany/serviceaccounts`,
      account,
      getHeaders()
    )

  public deleteItem = (id: string) =>
    this.instance.delete(
      `${getApiBase()}/api/administration/serviceaccount/owncompany/serviceaccounts/${id}`,
      getHeaders()
    )
}
