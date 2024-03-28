/********************************************************************************
 * Copyright (c) 2021 2023 Mercedes-Benz Group AG and BMW Group AG
 * Copyright (c) 2021 2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing software
 * distributed under the License is distributed on an AS IS BASIS WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import type {
  BpdmLegalFormObject,
  BpdmTypeRelation,
  BpdmTypeUUIDKeyPair,
  BpdmLegalAddressObject,
} from '../partnerNetwork/types'

export interface BusinessPartner {
  score?: number
  legalName: string
  bpnl: string
  member?: boolean
  identifiers: Array<BpdmTypeUUIDKeyPair>
  legalShortName: string
  legalForm: BpdmLegalFormObject
  states: [
    {
      description: string
      validFrom: string
      validTo: string
      type: {
        technicalKey: string
        name: string
      }
    },
  ]
  classifications: [
    {
      value: string
      code: string
      type: {
        technicalKey: string
        name: string
      }
    },
  ]
  relations: Array<BpdmTypeRelation>
  currentness: string
  createdAt: string
  updatedAt: string
  legalAddress: BpdmLegalAddressObject
}

export interface FetchBusinessPartnerType {
  content: BusinessPartner[]
  contentSize: number
  page: number
  totalElements: number
  totalPages: number
}

export interface FetchBusinessPartnerContentType {
  contentSize: number
  page: number
  totalElements: number
  totalPages: number
}
