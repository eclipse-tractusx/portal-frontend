/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
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

import {
  mapBusinessPartnerToDataGrid,
  mapSingleBusinessPartnerToDataGrid,
} from 'utils/dataMapper'
import TestAPIData from '../../public/testdata/partnerNetwork/businessPartnersAPIResult.json'
import TestSingleData from '../../public/testdata/partnerNetwork/businessPartnersSingleResult.json'
import TestDataGridData from '../../public/testdata/partnerNetwork/businessPartnersDataGrid.json'
import TestMembershipData from '../../public/testdata/partnerNetwork/membershipData.json'
import TestSingleDataGridData from '../../public/testdata/partnerNetwork/businessPartnersSingleDataGrid.json'
import {
  BusinessPartner,
  BusinessPartnerResponse,
} from 'features/partnerNetwork/types'

describe('DataMapperTest', () => {
  it('mapBusinessPartnerToDataGrid maps correctly', () => {
    const mockListToDataGridFunc = jest.fn(mapBusinessPartnerToDataGrid)
    const mapDataGridResult = mockListToDataGridFunc(
      TestAPIData as unknown as BusinessPartnerResponse,
      TestMembershipData
    )

    // Make sure function called one time
    expect(mockListToDataGridFunc).toHaveBeenCalledTimes(1)

    // Make sure return result deeply equal to example data
    expect(mapDataGridResult).toStrictEqual(TestDataGridData)

    // Pick random entry and compare with result
    const randomEntry = Math.floor(Math.random() * mapDataGridResult.length)
    expect(mapDataGridResult[randomEntry]).toStrictEqual(
      TestDataGridData[randomEntry]
    )
  })

  it('mapSingleBusinessPartnerToDataGrid maps correctly', () => {
    const mockEntryToDataGridFunc = jest.fn(mapSingleBusinessPartnerToDataGrid)
    const mapDataGridResult = mockEntryToDataGridFunc(
      TestSingleData as unknown as BusinessPartner
    )

    // Make sure function called one time
    expect(mockEntryToDataGridFunc).toHaveBeenCalledTimes(1)

    // Make sure return result deeply equal to example data
    expect(mapDataGridResult).toStrictEqual(TestSingleDataGridData)
  })
})
