/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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
import { HttpClient } from 'utils/HttpClient'
import type { BusinessPartnerResponse, BusinessPartner } from './types'
import { getApiBase, getBpdmPoolApiBase } from 'services/EnvironmentService'
import { getHeaders } from 'services/RequestService'
import type { SearchParams } from 'types/MainTypes'

// Instance of BPDM API endpoint
export class PartnerNetworkApi extends HttpClient {
  private static classInstance?: PartnerNetworkApi

  public constructor() {
    super(getBpdmPoolApiBase())
  }

  // To avoid create an instance everytime, pointed to Singleton of static value
  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new PartnerNetworkApi()
    }
    return this.classInstance
  }

  public getAllBusinessPartner = (filters: SearchParams) =>
    this.instance.get<BusinessPartnerResponse>(
      `/catena/business-partner?${qs.stringify(filters)}`,
      getHeaders()
    )

  public getBusinessPartnerByBpn = (bpn: string) =>
    this.instance.get<BusinessPartner>(
      `/catena/legal-entities/${bpn}`,
      getHeaders()
    )

  public getAllMemberCompanies = () =>
    this.instance.get<string[]>(
      `${getApiBase()}/api/administration/partnernetwork/memberCompanies`,
      getHeaders()
    )
}
