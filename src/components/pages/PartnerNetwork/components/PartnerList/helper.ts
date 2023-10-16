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

import {
  type BusinessPartner,
  type BusinessPartnerAddressResponse,
} from 'features/partnerNetwork/types'

export const isQueryDataPresent = (queryData: string[]) =>
  queryData && queryData.length > 0

export const isContentPresent = (data: { content: Object }) => data?.content

export const addCountryAttribute = (
  finalObj: BusinessPartner[],
  payload: BusinessPartnerAddressResponse[]
) => {
  finalObj.forEach((x: BusinessPartner) => {
    payload.forEach((y: BusinessPartnerAddressResponse) => {
      if (x.bpnl === y.bpnLegalEntity) {
        x.legalAddress.alternativePostalAddress = y.alternativePostalAddress
        x.legalAddress.physicalPostalAddress = y.physicalPostalAddress
      }
    })
  })
  return finalObj
}

export const addMemberAttribute = (
  finalObj: BusinessPartner[],
  queryData: (string | null)[] | undefined
) => {
  if (queryData) {
    finalObj.forEach((x: BusinessPartner) => {
      x.member = queryData.includes(x.bpnl)
    })
  }
  return finalObj
}
