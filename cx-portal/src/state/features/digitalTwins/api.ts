import UserService from 'services/UserService'
import { HttpClient } from 'utils/HttpClient'
import { TwinList } from './types'

export class DigitalTwinApi extends HttpClient {
  private static classInstance?: DigitalTwinApi

  public constructor(token: string) {
    super(`${process.env.REACT_APP_SLDT_API_BASE_URL}/twin-registry/registry/shell-descriptors?page=0&pageSize=10`, {
      Authorization: `Bearer ${token}`,
    })
  }

  public static getInstance(token: string) {
    if (!this.classInstance) {
      this.classInstance = new DigitalTwinApi(token)
    }
    return this.classInstance
  }

  public getItems = () => {
    return this.instance.get<TwinList>(`/`, {
      headers: {
        Authorization: `Bearer ${UserService.getToken()}`,
      },
    })
  }
}
