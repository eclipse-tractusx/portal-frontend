/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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

import type { GeographicCoordinate } from 'types/MainTypes'

//region Common Key Value pairs type
export interface BpdmTypeNameObject {
  name: string
  url?: string
}

export interface BpdmTypeCommonKeyValuePair extends BpdmTypeNameObject {
  technicalKey: string
}

export interface BpdmTypeUUIDKeyPair {
  uuid: string
  value: string
  type: BpdmTypeCommonKeyValuePair
  issuingBody?: BpdmTypeCommonKeyValuePair
  status?: BpdmTypeCommonKeyValuePair
}

export interface BpdmTypeLanguagePair extends BpdmTypeUUIDKeyPair {
  language: BpdmTypeCommonKeyValuePair
}

//endregion

//region Bpdm Address Types
export interface BpdmAddressVersion {
  characterSet: BpdmTypeCommonKeyValuePair
  language: BpdmTypeCommonKeyValuePair
}

export interface BpdmTypeWithShortName extends BpdmTypeLanguagePair {
  shortName: string
  fipsCode?: string
}

export interface BpdmTypeThoroughfare extends BpdmTypeWithShortName {
  name?: string
  number?: string // Consider as street number and can be string
  direction?: string
}

export interface BpdmAddresses {
  uuid: string
  version: BpdmAddressVersion
  careOf: string
  contexts: Array<string>
  country: BpdmTypeCommonKeyValuePair
  administrativeAreas: Array<BpdmTypeWithShortName>
  postCodes: Array<BpdmTypeUUIDKeyPair>
  localities: Array<BpdmTypeWithShortName>
  thoroughfares: Array<BpdmTypeThoroughfare>
  premises: Array<BpdmTypeThoroughfare>
  postalDeliveryPoints: Array<BpdmTypeThoroughfare>
  geographicCoordinates: GeographicCoordinate
  types: Array<BpdmTypeCommonKeyValuePair>
}
//endregion

//region Bpdm Bank Account Type
export interface BpdmTypeBankAccount {
  uuid: string
  trustScores: Array<number>
  currency: BpdmTypeCommonKeyValuePair
  internationalBankAccountIdentifier: string
  internationalBankIdentifier: string
  nationalBankAccountIdentifier: string
  nationalBankIdentifier: string
}
//endregion

//region Other Bpdm Types
export interface BpdmTypeRelation {
  uuid: string
  relationClass: BpdmTypeCommonKeyValuePair
  type: BpdmTypeCommonKeyValuePair
  startNode: string
  endNode: string
  startedAt?: Date
  endedAt?: Date
}

export interface BpdmProfileClassification extends BpdmTypeUUIDKeyPair {
  code?: string
}

export interface BpdmLegalFormObject extends BpdmTypeCommonKeyValuePair {
  mainAbbreviation: string
  language: BpdmTypeCommonKeyValuePair
  categories: Array<BpdmTypeNameObject>
}

export interface BpdmBusinessStatus {
  uuid: string
  officialDenotation: string
  validFrom: Date
  validUntil: Date
  type: BpdmTypeCommonKeyValuePair
}
//endregion

export interface LegalFormType {
  technicalKey: string
  name: string
  abbreviation: string
}

export interface BusinessPartner {
  score?: number
  legalName: string
  bpnl: string
  member?: boolean
  identifiers: Array<BpdmTypeUUIDKeyPair>
  legalShortName: string
  // TODO: add an ESLint exception until there is a solution
  // eslint-disable-next-line
  legalForm: any
  states: [
    {
      description: string
      validFrom: string
      validTo: string
      type: {
        technicalKey: string
        name: string
      }
    }
  ]
  classifications: [
    {
      value: string
      code: string
      type: {
        technicalKey: string
        name: string
      }
    }
  ]
  relations: Array<BpdmTypeRelation>
  currentness: string
  createdAt: string
  updatedAt: string
  legalAddress: BpdmLegalAddressObject
}

export interface BusinessPartnerResponse {
  totalElements: number
  totalPages: number
  page: number
  contentSize: number
  content: Array<BusinessPartner>
}

export interface BusinessPartnerAddressResponse {
  alternativePostalAddress: AlternatePostalAddressType
  bpnLegalEntity: string
  createdAt: string
  updatedAt: string
  physicalPostalAddress: PhysicalPostalAddressType
}

export interface PaginationData {
  totalElements: number
  page: number
}

export interface PartnerNetworkInitialState {
  paginationData: PaginationData
  mappedPartnerList: Array<PartnerNetworkDataGrid>
  membershipData: string[]
  membershipError: string
  loading: boolean
  error: string
}

export interface PartnerNetworkDataGrid {
  bpnl: string
  legalName: string
  // TODO: add an ESLint exception until there is a solution
  // eslint-disable-next-line
  legalForm: any
  // eslint-disable-next-line
  legalAddress: any
  identifiers: Array<BpdmTypeUUIDKeyPair>
}

export interface BpdmLegalAddressStatesObject {
  description: string
  validFrom: string
  validTo: string
  type: {
    technicalKey: string
    name: string
  }
}

export interface AlternatePostalAddressType {
  geographicCoordinates: {
    longitude: 0
    latitude: 0
    altitude: 0
  }
  country: {
    technicalKey: string
    name: string
  }
  postalCode: string
  city: string
  administrativeAreaLevel1: {
    countryCode: string
    regionCode: string
    regionName: string
  }
  deliveryServiceNumber: string
  deliveryServiceType: string
  deliveryServiceQualifier: string
}

export interface PhysicalPostalAddressType {
  geographicCoordinates: {
    longitude: 0
    latitude: 0
    altitude: 0
  }
  country: {
    technicalKey: string
    name: string
  }
  postalCode: string
  city: string
  street: {
    name: string
    houseNumber: string
    milestone: string
    direction: string
  }
  administrativeAreaLevel1: {
    countryCode: string
    regionCode: string
    regionName: string
  }
  administrativeAreaLevel2: string
  administrativeAreaLevel3: string
  district: string
  companyPostalCode: string
  industrialZone: string
  building: string
  floor: string
  door: string
}

export interface BpdmLegalAddressObject {
  bpna: string
  name: string
  states: Array<BpdmLegalAddressStatesObject>
  identifiers: [
    {
      value: string
      type: {
        technicalKey: string
        name: string
      }
    }
  ]
  physicalPostalAddress: PhysicalPostalAddressType
  alternativePostalAddress: AlternatePostalAddressType
  bpnLegalEntity: string
  bpnSite: string
  createdAt: string
  updatedAt: string
  isMainAddress: boolean
  isLegalAddress: boolean
}
