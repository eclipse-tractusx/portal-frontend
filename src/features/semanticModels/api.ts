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

import qs from 'qs'
import { HttpClient } from 'utils/httpClient'
import type {
  FilterParams,
  ModelList,
  NewSemanticModel,
  SemanticModel,
} from './types'
import { getSemanticApiBase } from 'services/EnvironmentService'
import { getHeaders, getTextHeaders } from 'services/RequestService'

export class Api extends HttpClient {
  private static classInstance?: Api

  public constructor() {
    super(`${getSemanticApiBase()}/hub/api/v1/`)
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new Api()
    }
    return this.classInstance
  }

  public getModels = (filters: FilterParams) =>
    this.instance.get<ModelList>(
      `models?${qs.stringify(filters)}`,
      getHeaders()
    )

  public getStaticModels = () =>
    this.instance.get<ModelList>('api/semanticModels/models.json')

  public getModelById = (id: string) =>
    this.instance.get<SemanticModel>(`models/${id}`, getHeaders())

  public deleteModelById = (id: string) =>
    this.instance.delete<string>(`models/${id}`, getHeaders())

  public postSemanticModel = (model: NewSemanticModel) =>
    this.instance.post<SemanticModel>(
      `models?type=${model.type}&status=${model.status}`,
      model.model,
      getTextHeaders()
    )

  public getOpenAPIUrl = (id: string, url: string) =>
    this.instance.get<Blob>(`models/${id}/openapi?baseUrl=${url}`, {
      responseType: 'blob',
      ...getHeaders(),
    })
}
