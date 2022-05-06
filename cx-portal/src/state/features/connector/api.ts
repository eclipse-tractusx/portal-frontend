import { HttpClient } from 'utils/HttpClient'
import { ConnectorResponse, SearchParams } from './types'
import UserService from 'services/UserService'
import qs from 'querystring'

// Instance of Connector API endpoint
export class ConnectorApi extends HttpClient {
  private static classInstance?: ConnectorApi

  public constructor() {
    super(process.env.REACT_APP_BPDM_API_BASE_URL || '')
  }

  // To avoid create an instance everytime, pointed to Singleton of static value
  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new ConnectorApi()
    }
    return this.classInstance
  }

  // Temp method to simulate API call
  // Will updated when endpoint gets ready
  public getAllConnector = (filters: SearchParams) => {
    const params = qs.stringify(filters)
    return this.instance.get<ConnectorResponse>(
      `/catena/business-partner?${params}`,
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
  }
}
