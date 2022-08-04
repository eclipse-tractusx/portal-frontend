import { getApiBase } from 'services/EnvironmentService'
import { getHeaders } from 'services/RequestService'
import { PaginResult } from 'types/MainTypes'
import { HttpClient } from 'utils/HttpClient'
import { TenantUser } from '../userApiSlice'
import { AddUser } from './types'

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

  public getTenantUsers = () =>
    this.instance.get<PaginResult<TenantUser>>(
      `/api/administration/user/owncompany/users?status=ACTIVE&page=0&size=20`,
      getHeaders()
    )

  public searchTenantUsers = (expr: string) =>
    this.instance.get<TenantUser[]>(
      `/api/administration/user/owncompany/users?status=ACTIVE&firstName=${expr}&lastName=${expr}`,
      getHeaders()
    )

  public addTenantUsers = (users: AddUser[]) =>
    this.instance.post<AddUser[]>(
      `/api/administration/user/owncompany/users`,
      users,
      getHeaders()
    )
}
