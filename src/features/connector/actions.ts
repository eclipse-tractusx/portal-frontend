/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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

import { createAsyncThunk } from '@reduxjs/toolkit'
import { ConnectorApi } from './api'
import type { SearchParams } from 'types/MainTypes'
import type { ConnectorCreateBody } from './types'

const fetchConnectors = createAsyncThunk(
  'connector/fetchConnectors',
  async ({ params }: { params: SearchParams; token: string }) => {
    try {
      // Call axios instance to get values
      return await ConnectorApi.getInstance().getAllConnector(params)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchConnectors api call error')
    }
  }
)

const createConnector = createAsyncThunk(
  'connector/createConnector',
  async ({ body }: { body: ConnectorCreateBody }) => {
    try {
      // Prepare additional hardcoded data to POST call
      const newConnectorBody = {
        name: body.name,
        connectorUrl: body.connectorUrl,
        type: body.type,
        status: 'PENDING',
        location: 'DE',
        provider: '2dc4249f-b5ca-4d42-bef1-7a7a950a4f87',
        host: '2dc4249f-b5ca-4d42-bef1-7a7a950a4f87',
      }

      // Call axios instance to get values
      return await ConnectorApi.getInstance().createConnector(newConnectorBody)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('createConnectors api call error')
    }
  }
)

const deleteConnector = createAsyncThunk(
  'connector/deleteConnector',
  async ({ connectorID }: { connectorID: string }) => {
    try {
      // Call axios instance to get values
      // eslint-disable-next-line
      return await ConnectorApi.getInstance().deleteConnector(connectorID)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('deleteConnector api call error')
    }
  }
)

export { fetchConnectors, createConnector, deleteConnector }
