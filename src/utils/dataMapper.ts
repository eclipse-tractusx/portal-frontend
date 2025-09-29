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

import type { BusinessPartnerResponse } from 'features/partnerNetwork/types'
import type {
  RegistrationRequest,
  RegistrationRequestDataGrid,
} from 'features/admin/registration/types'
import type { BusinessPartner } from 'features/newPartnerNetwork/types'
import { SharingStateStatusType } from 'features/companyData/companyDataApiSlice'

type StatusColorType =
  | 'success'
  | 'warning'
  | 'info'
  | 'primary'
  | 'error'
  | 'default'
  | undefined

export const statusColorMap: Record<SharingStateStatusType, StatusColorType> = {
  [SharingStateStatusType.Success]: 'success',
  [SharingStateStatusType.Initial]: 'default',
  [SharingStateStatusType.Pending]: 'default',
  [SharingStateStatusType.Default]: 'default',
  [SharingStateStatusType.Ready]: 'primary',
  [SharingStateStatusType.Error]: 'error',
}

// Temporary solution for mapping api response to DataGrid component type
const mapBusinessPartnerToDataGrid = (
  bpResponse: BusinessPartnerResponse,
  _membershipData: string[]
): Array<BusinessPartner> => {
  return bpResponse?.content?.map((bp: BusinessPartner) => {
    return bp
  })
}

const mapSingleBusinessPartnerToDataGrid = (
  bp: BusinessPartner
): BusinessPartner => {
  return bp
}

const mapRegistrationRequestResponseToDataGrid = (
  requestsResponse: Array<RegistrationRequest>
): Array<RegistrationRequestDataGrid> => {
  return requestsResponse?.map((request: RegistrationRequest) => {
    return {
      applicationId: request.applicationId,
      dateCreated: request.dateCreated,
      companyInfo: {
        companyName: request.companyName,
        email: request.email,
        bpn: request.bpn,
      },
      documents: request.documents,
      status: request.applicationStatus,
    } as RegistrationRequestDataGrid
  })
}

export {
  mapBusinessPartnerToDataGrid,
  mapSingleBusinessPartnerToDataGrid,
  mapRegistrationRequestResponseToDataGrid,
}
