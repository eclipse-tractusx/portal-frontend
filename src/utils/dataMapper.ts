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

import {
  BusinessPartner,
  BusinessPartnerResponse,
  PartnerNetworkDataGrid,
} from 'features/partnerNetwork/types'

import {
  RegistrationRequest,
  RegistrationRequestDataGrid,
} from 'features/admin/registration/types'

// Temporary solution for mapping api response to DataGrid component type
const mapBusinessPartnerToDataGrid = (
  bpResponse: BusinessPartnerResponse,
  membershipData: string[]
): Array<PartnerNetworkDataGrid> => {
  return bpResponse?.content?.map((bp: BusinessPartner) => {
    return {
      bpn: bp.bpnl,
      legalForm: bp.legalForm?.name || '',
      cxmember: membershipData.includes(bp.bpnl),
      name: bp.legalName,
      country:
        bp.legalAddress?.physicalPostalAddress?.country.name ??
        bp.legalAddress?.alternativePostalAddress?.country.name ??
        '',
      street: bp.legalAddress?.physicalPostalAddress?.street.name ?? '',
      zipCode: bp.legalAddress?.physicalPostalAddress?.postalCode ?? '',
      city: bp.legalAddress?.physicalPostalAddress?.city ?? '',
      identifiers: bp.identifiers?.filter(
        (identifier) => identifier.type.technicalKey !== 'CDQID'
      ),
    } as PartnerNetworkDataGrid
  })
}

const mapSingleBusinessPartnerToDataGrid = (
  bp: BusinessPartner
): PartnerNetworkDataGrid => {
  return {
    bpn: bp.bpnl,
    name: bp.legalName ?? '-', //value can be INTERNATIONAL < LOCAL < OTHER
    legalForm: bp.legalForm?.name || '',
    country:
      bp.legalAddress?.physicalPostalAddress?.country.name ??
      bp.legalAddress?.alternativePostalAddress?.country.name ??
      '',
    street: bp.legalAddress?.physicalPostalAddress?.street.name ?? '',
    zipCode: bp.legalAddress?.physicalPostalAddress?.postalCode ?? '',
    city: bp.legalAddress?.physicalPostalAddress?.city ?? '',
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
