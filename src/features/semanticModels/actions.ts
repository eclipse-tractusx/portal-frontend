/********************************************************************************
 * Copyright (c) 2023 T-Systems International GmbH and BMW Group AG
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

import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import type { ErrorResponse, FilterParams, NewSemanticModel } from './types'
import { error, type LogData } from 'services/LogService'

const message = 'The server responded with an error.'

const fetchSemanticModels = createAsyncThunk(
  'semantic/models/fetch',
  async ({ filter }: { filter: FilterParams }) => {
    try {
      return await Api.getInstance().getModels(filter)
    } catch (e: unknown) {
      error('api call error:', e as LogData)
      throw Error(JSON.stringify((e as ErrorResponse).response.status))
    }
  }
)

const fetchSemanticModelById = createAsyncThunk(
  'semantic/model/fetchById',
  async (id: string) => {
    try {
      return await Api.getInstance().getModelById(id)
    } catch (e: unknown) {
      error('api call error:', e as LogData)
      throw Error(`Fetching model failed: ${message}`)
    }
  }
)

const deleteSemanticModelById = createAsyncThunk(
  'semantic/model/delete',
  async (params: { id: string; modelName: string }) => {
    const { id, modelName } = params
    try {
      const encodedUrn = encodeURIComponent(id.replace(modelName, ''))
      return await Api.getInstance()
        .deleteModelById(encodedUrn)
        .then(() => id)
    } catch (e: unknown) {
      error('api call error:', e as LogData)
      throw Error(`Deleting model failed: ${message}`)
    }
  }
)

const postSemanticModel = createAsyncThunk(
  'semantic/model/post',
  async (model: NewSemanticModel) => {
    try {
      return await Api.getInstance().postSemanticModel(model)
    } catch (e: unknown) {
      error('api call error:', e as LogData)
      throw Error(`${error}. Adding a new model failed.`)
    }
  }
)
const changeOpenApiUrl = createAsyncThunk(
  'semantic/model/openApi/post',
  async (params: { id: string; url: string }) => {
    const { id, url } = params
    try {
      return await Api.getInstance().getOpenAPIUrl(id, url)
    } catch (e: unknown) {
      error('api call error:', e as LogData)
      throw Error('Change open API URL call error.')
    }
  }
)
export {
  fetchSemanticModels,
  fetchSemanticModelById,
  deleteSemanticModelById,
  postSemanticModel,
  changeOpenApiUrl,
}
