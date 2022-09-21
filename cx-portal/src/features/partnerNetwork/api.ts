/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
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

import qs from 'querystring'
import { HttpClient } from 'utils/HttpClient'
import { BusinessPartnerResponse, BusinessPartner } from './types'
import { getApiBase, getBpdmApiBase } from 'services/EnvironmentService'
import { getHeaders } from 'services/RequestService'
import { SearchParams } from 'types/MainTypes'

// Instance of BPDM API endpoint
export class PartnerNetworkApi extends HttpClient {
  private static classInstance?: PartnerNetworkApi

  public constructor() {
    super(getBpdmApiBase())
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
      `/catena/business-partner/${bpn}?idType=BPN`,
      getHeaders()
    )

  public getAllMemberCompanies = () =>
    this.instance.get<string[]>(
      `${getApiBase()}/api/administration/partnernetwork/memberCompanies`,
      getHeaders()
    )
}
