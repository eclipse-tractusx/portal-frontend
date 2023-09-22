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

import qs from 'qs'
import { HttpClient } from 'utils/HttpClient'
import type { FilterParams, ShellDescriptor, TwinList } from './types'
import { getSemanticApiBase } from 'services/EnvironmentService'
import { getHeaders } from 'services/RequestService'

export class Api extends HttpClient {
  private static classInstance?: Api

  public constructor() {
    super(`${getSemanticApiBase()}/registry`)
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new Api()
    }
    return this.classInstance
  }

  public getTwins = (filters: FilterParams) =>
    this.instance.get<TwinList>(
      `/registry/shell-descriptors?${qs.stringify(filters)}`,
      getHeaders()
    )

  public getTwinById = (id: string) =>
    this.instance.get<ShellDescriptor>(
      `/registry/shell-descriptors/${id}`,
      getHeaders()
    )

  public getTwinForSearch = (search: string) =>
    this.instance.get(`lookup/shells?assetIds=${search}`, getHeaders())
}
