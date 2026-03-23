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

import { getApiBase } from 'services/EnvironmentService'
import { getHeaders } from 'services/RequestService'
import type { PaginResult } from '@arena2036/portal-shared-components-construct-x'
import { HttpClient } from 'utils/httpClient'
import type { TenantUser } from '../userApiSlice'
import type { AddUser } from './types'

export class Api extends HttpClient {
  private static classInstance?: Api

  public constructor() {
    super(getApiBase())
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new Api()
    }

    return this.classInstance
  }

  public getTenantUsers = () =>
    this.instance.get<PaginResult<TenantUser>>(
      '/api/administration/user/owncompany/users?status=ACTIVE&page=0&size=20',
      getHeaders()
    )

  public searchTenantUsers = (expr: string) =>
    this.instance.get<TenantUser[]>(
      `/api/administration/user/owncompany/users?status=ACTIVE&firstName=${expr}&lastName=${expr}`,
      getHeaders()
    )

  public addTenantUsers = (users: AddUser[]) =>
    this.instance.post<AddUser[]>(
      '/api/administration/user/owncompany/users',
      users,
      getHeaders()
    )
}
