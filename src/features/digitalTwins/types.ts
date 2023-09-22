/********************************************************************************
 * Copyright (c) 2021, 2023 T-Systems International GmbH and BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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

import type { Nullable } from 'types/MainTypes'

export interface DigitalTwinsInitialState {
  twinList: TwinList
  twin: Nullable<ShellDescriptor>
  loading: boolean
  error: string
}

export type FilterParams = {
  readonly page: number
  readonly pageSize: number
}

export interface TwinList {
  items: Array<ShellDescriptor>
  totalItems: number
  itemCount: number
  currentPage: number
  totalPages: number
}

export interface ShellDescriptor {
  description: Description[]
  globalAssetId: {
    value: [string]
  }
  idShort: string
  identification: string
  specificAssetIds: [
    {
      key: string
      semanticId: SemanticId
      value: string
    }
  ]
  submodelDescriptors: SubmodelDescriptors[]
}

export interface SubmodelDescriptors {
  description: Description[]
  endpoints: Endpoints[]
  idShort: string
  identification: string
  semanticId: SemanticId
}

interface Description {
  language: string
  text: string
}

interface Endpoints {
  interface: string
  protocolInformation: {
    endpointAddress: string
    endpointProtocol: string
    endpointProtocolVersion: string
    subprotocol: string
    subprotocolBody: string
    subprotocolBodyEncoding: string
  }
}

interface SemanticId {
  value: string[]
}
