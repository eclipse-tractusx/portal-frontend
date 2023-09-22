/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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

import type {
  BusinessPartner,
  BusinessPartnerResponse,
  BusinessPartnerSearchResponse,
  PartnerNetworkDataGrid,
} from 'features/partnerNetwork/types'

import type {
  RegistrationRequest,
  RegistrationRequestDataGrid,
} from 'features/admin/registration/types'
import { cloneDeep } from 'lodash'

// Temporary solution for mapping api response to DataGrid component type
const mapBusinessPartnerToDataGrid = (
  bpResponse: BusinessPartnerResponse,
  membershipData: string[]
): Array<PartnerNetworkDataGrid> => {
  return bpResponse?.content?.map((bp: BusinessPartnerSearchResponse) => {
    const bpAddress = bp.businessPartner.addresses[0]
    return {
      bpn: bp.businessPartner.bpn,
      legalForm: bp.businessPartner.legalForm?.name || '',
      cxmember: membershipData.includes(bp.businessPartner.bpn),
      name: bp.businessPartner.names.filter(
        (name) =>
          name.type.technicalKey === 'INTERNATIONAL' ||
          name.type.technicalKey === 'LOCAL'
      )[0].value,
      country: bpAddress.country.name,
      street: bpAddress.thoroughfares[0].value,
      zipCode: bpAddress.postCodes[0].value,
      city: bpAddress.localities[0].value,
      identifiers: bp.businessPartner.identifiers?.filter(
        (identifier) => identifier.type.technicalKey !== 'CDQID'
      ),
    } as PartnerNetworkDataGrid
  })
}

const mapSingleBusinessPartnerToDataGrid = (
  bp: BusinessPartner
): PartnerNetworkDataGrid => {
  const bpAddress = bp.addresses[0]
  const names = cloneDeep(bp.names)
  return {
    bpn: bp.bpn,
    name: names.length
      ? names.sort((a, b) =>
          a.type.technicalKey.localeCompare(b.type.technicalKey)
        )[0].value
      : '-', //value can be INTERNATIONAL < LOCAL < OTHER
    legalForm: bp.legalForm?.name || '',
    country: bpAddress.country.name,
    street: bpAddress.thoroughfares[0].value,
    zipCode: bpAddress.postCodes[0].value,
    city: bpAddress.localities[0].value,
    identifiers: bp.identifiers?.filter(
      (identifier) => identifier.type.technicalKey !== 'CDQID'
    ),
  } as PartnerNetworkDataGrid
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
