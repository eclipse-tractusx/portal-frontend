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
import { HttpClient } from 'utils/httpClient'
import type { UserDetail } from './types'

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

  public getUserOwn = () =>
    this.instance.get<UserDetail>(
      '/api/administration/user/ownuser',
      getHeaders()
    )

  public getUserInfo = (companyUserId: string) =>
    this.instance.get<UserDetail>(
      `/api/administration/user/ownCompany/users/${companyUserId}`,
      getHeaders()
    )

  public addBusinessPartnerNumber = (companyUserId: string, bpn: string) =>
    this.instance.put<number>(
      `/api/administration/user/ownCompany/users/${companyUserId}/businessPartnerNumbers/${bpn}`,
      {},
      getHeaders()
    )

  public deleteBpn = (companyUserId: string, bpn: string) =>
    this.instance.delete<number>(
      `/api/administration/user/ownCompany/users/${companyUserId}/businessPartnerNumbers/${bpn}`,
      getHeaders()
    )
}
