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

import { getAssetBase } from 'services/EnvironmentService'
import { HttpClient } from 'utils/HttpClient'
import { AppMarketplaceApp } from './types'

export class Api extends HttpClient {
  private static classInstance?: Api

  public constructor() {
    super(getAssetBase())
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new Api()
    }
    return this.classInstance
  }

  public getActive = () =>
    this.instance.get<AppMarketplaceApp[]>(`/api/apps/active.json`)

  public getLatest = () =>
    this.instance.get<AppMarketplaceApp[]>(`/api/apps/latest.json`)

  public getSubscribed = (all?: boolean) =>
    this.instance.get<AppMarketplaceApp[]>(
      `/api/apps/subscribed.json${all ? '?' : ''}`
    )
}
