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

import { HttpClient } from 'utils/HttpClient'
import { ProvisionIdentityProviderData } from './types'
import UserService from 'services/UserService'
import { getApiBase } from 'services/EnvironmentService'

export class ProvisioningApi extends HttpClient {
  private static classInstance?: ProvisioningApi

  public constructor() {
    super(getApiBase())
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new ProvisioningApi()
    }

    return this.classInstance
  }

  public provisionIdp = (provisionIdp: ProvisionIdentityProviderData) => {
    return this.instance.post<void>(
      '/api/provisioning/identityprovider/setup',
      JSON.stringify(provisionIdp),
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
          'content-type': 'application/json',
        },
      }
    )
  }
}
