/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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

export type ConnectorAPIResponse = {
  meta: PaginationData
  content: Array<ConnectorContentAPIResponse>
}

export type ConnectorContentAPIResponse = {
  id?: string
  name: string
  location: string
  type: string
  providerCompanyName: string
  selfDescriptionDocumentId: string
  status: string
  technicalUser?: {
    id: string
    name: string
    clientId: string
    description: string
  }
}

export type ConnectorCreateBody = {
  name: string
  connectorUrl: string
  type: string
}

export type PaginationData = {
  totalElements: number
  page: number
}

export type ConnectorInitialState = {
  paginationData: PaginationData
  connectorList: Array<ConnectorContentAPIResponse>
  loading: boolean
  error: string
}

/*

// Mock type reserved for mapping API response to Data grid type
export type ConnectorDataGrid = {
  id: string
  name: string
  type: string
}

 */

export type SearchParams = {
  readonly name?: string
  readonly page: number
  readonly size: number
}
