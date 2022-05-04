import UserService from 'services/UserService'
import { HttpClient } from 'utils/HttpClient'
import { FilterParams, ShellDescriptor, TwinList } from './types'
import qs from 'querystring'

export class DigitalTwinApi extends HttpClient {
  private static classInstance?: DigitalTwinApi;


  public constructor() {
    super(`${process.env.REACT_APP_SLDT_API_BASE_URL}/twin-registry/registry/shell-descriptors`)
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new DigitalTwinApi()
    }
    return this.classInstance
  }

  public getTwins = (filters: FilterParams) => {
    const params = qs.stringify(filters)
    return this.instance.get<TwinList>(`?${params}`, {
      headers: {
        Authorization: `Bearer ${UserService.getToken()}`,
      },
    })
  }

  public getTwinById = (id: string) => {
    return this.instance.get<ShellDescriptor>(`/${id}`, {
      headers: {
        Authorization: `Bearer ${UserService.getToken()}`,
      },
    })
  }
}
