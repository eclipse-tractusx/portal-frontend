import qs from 'querystring'
import { HttpClient } from 'utils/HttpClient'
import { ConnectorResponse, SearchParams } from './types'
import { getBpdmApiBase } from 'services/EnvironmentService'
import { getHeaders } from 'services/RequestService'

// Instance of Connector API endpoint
export class ConnectorApi extends HttpClient {
  private static classInstance?: ConnectorApi

  public constructor() {
    super(getBpdmApiBase())
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
  public getAllConnector = (filters: SearchParams) =>
    this.instance.get<ConnectorResponse>(
      `/catena/business-partner?${qs.stringify(filters)}`,
      getHeaders()
    )
}
