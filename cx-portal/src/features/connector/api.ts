import qs from 'querystring'
import { HttpClient } from 'utils/HttpClient'
import {
  ConnectorAPIResponse,
  SearchParams,
  ConnectorCreateBody,
} from './types'
import { getApiBase } from 'services/EnvironmentService'
import { getHeaders } from 'services/RequestService'

// Instance of Connector API endpoint
export class ConnectorApi extends HttpClient {
  private static classInstance?: ConnectorApi

  public constructor() {
    super(getApiBase())
  }

  // To avoid create an instance everytime, pointed to Singleton of static value
  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new ConnectorApi()
    }
    return this.classInstance
  }

  public getAllConnector = (filters: SearchParams) =>
    this.instance.get<ConnectorAPIResponse>(
      `/api/administration/Connectors?${qs.stringify(filters)}`,
      getHeaders()
    )

  public createConnector = (body: ConnectorCreateBody) =>
    this.instance.post<ConnectorCreateBody>(
      `/api/administration/Connectors`,
      body,
      getHeaders()
    )
}
