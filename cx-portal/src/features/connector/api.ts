/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

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

  public deleteConnector = (connectorID: string) =>
    this.instance.delete(
      `/api/administration/Connectors/${connectorID}`,
      getHeaders()
    )
}
