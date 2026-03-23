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
import { HttpClient } from 'utils/httpClient'
import type { InviteData, CompanyDetail, InvitesDataGrid } from './types'
import { getHeaders } from 'services/RequestService'
import { PAGE_SIZE } from 'types/Constants'
import type { SearchParams } from '../../connector/types'
import qs from 'qs'
import type { PaginResult } from '@arena2036/portal-shared-components-construct-x'

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

  public getRegistrationRequests = (filters: SearchParams) =>
    this.instance.get<void>(
      `/api/administration/registration/applications?${qs.stringify(filters)}`,
      getHeaders()
    )

  public postInviteBusinessPartner = (invite: InviteData) =>
    this.instance.post<void>(
      '/api/administration/invitation',
      invite,
      getHeaders()
    )

  public getCompanyDetail = (applicationId: string) =>
    this.instance.get<CompanyDetail>(
      `/api/administration/registration/application/${applicationId}/companyDetailsWithAddress`,
      getHeaders()
    )

  public getItems = (page: number) =>
    this.instance.get<PaginResult<InvitesDataGrid>>(
      `api/administration/registration/applicationsWithStatus?page=${page}&size=${PAGE_SIZE}`,
      getHeaders()
    )
}
