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

import { GeographicCoordinate } from 'types/MainTypes'

//region Common Key Value pairs type
interface BpdmTypeNameObject {
  name: string
  url?: string
}

interface BpdmTypeCommonKeyValuePair extends BpdmTypeNameObject {
  technicalKey: string
}

export interface BpdmTypeUUIDKeyPair {
  uuid: string
  value: string
  type: BpdmTypeCommonKeyValuePair
  issuingBody?: BpdmTypeCommonKeyValuePair
  status?: BpdmTypeCommonKeyValuePair
}

interface BpdmTypeLanguagePair extends BpdmTypeUUIDKeyPair {
  language: BpdmTypeCommonKeyValuePair
}

//endregion

//region Bpdm Address Types
interface BpdmAddressVersion {
  characterSet: BpdmTypeCommonKeyValuePair
  language: BpdmTypeCommonKeyValuePair
}

interface BpdmTypeWithShortName extends BpdmTypeLanguagePair {
  shortName: string
  fipsCode?: string
}

interface BpdmTypeThoroughfare extends BpdmTypeWithShortName {
  name?: string
  number?: string // Consider as street number and can be string
  direction?: string
}

interface BpdmAddresses {
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
interface BpdmTypeBankAccount {
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
interface BpdmTypeRelation {
  uuid: string
  relationClass: BpdmTypeCommonKeyValuePair
  type: BpdmTypeCommonKeyValuePair
  startNode: string
  endNode: string
  startedAt?: Date
  endedAt?: Date
}

interface BpdmProfileClassification extends BpdmTypeUUIDKeyPair {
  code?: string
}

interface BpdmLegalFormObject extends BpdmTypeCommonKeyValuePair {
  mainAbbreviation: string
  language: BpdmTypeCommonKeyValuePair
  categories: Array<BpdmTypeNameObject>
}

interface BpdmBusinessStatus {
  uuid: string
  officialDenotation: string
  validFrom: Date
  validUntil: Date
  type: BpdmTypeCommonKeyValuePair
}
//endregion

export interface BusinessPartner {
  bpn: string // Unique identifier
  identifiers: Array<BpdmTypeUUIDKeyPair>
  names: Array<BpdmTypeLanguagePair>
  legalForm: BpdmLegalFormObject
  status: BpdmBusinessStatus
  addresses: Array<BpdmAddresses>
  profileClassifications: Array<BpdmProfileClassification>
  types: Array<BpdmTypeCommonKeyValuePair>
  bankAccounts: Array<BpdmTypeBankAccount>
  roles: Array<BpdmTypeCommonKeyValuePair>
  relations: Array<BpdmTypeRelation>
}

export interface BusinessPartnerSearchResponse {
  score: number
  businessPartner: BusinessPartner
}

export interface BusinessPartnerResponse {
  totalElements: number
  totalPages: number
  page: number
  contentSize: number
  content: Array<BusinessPartnerSearchResponse>
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
  bpn: string
  name: string
  legalForm: string
  country: string
  street: string
  zipCode: string
  city: string
  identifiers: Array<BpdmTypeUUIDKeyPair>
}
