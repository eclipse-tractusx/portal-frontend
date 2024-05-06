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

import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'features/store'
import { type CompanyDataType } from './companyDataApiSlice'

const name = 'companies/companyData'

export interface CompanyDataState {
  row: CompanyDataType
  status: string
}

export const initialState: CompanyDataState = {
  status: '',
  row: {
    externalId: '',
    nameParts: [''],
    identifiers: [
      {
        type: '',
        value: '',
        issuingBody: '',
      },
    ],
    states: [
      {
        validFrom: '',
        validTo: '',
        type: '',
      },
    ],
    roles: [],
    isOwnCompanyData: false,
    legalEntity: {
      legalEntityBpn: '',
      legalName: '',
      shortName: '',
      legalForm: '',
      confidenceCriteria: {
        sharedByOwner: false,
        checkedByExternalDataSource: false,
        numberOfSharingMembers: 0,
        lastConfidenceCheckAt: '',
        nextConfidenceCheckAt: '',
        confidenceLevel: 0,
      },
      states: [
        {
          validFrom: '',
          validTo: '',
          type: '',
        },
      ],
    },
    site: {
      siteBpn: '',
      name: '',
      confidenceCriteria: {
        sharedByOwner: false,
        checkedByExternalDataSource: false,
        numberOfSharingMembers: 0,
        lastConfidenceCheckAt: '',
        nextConfidenceCheckAt: '',
        confidenceLevel: 0,
      },
      states: [
        {
          validFrom: '',
          validTo: '',
          type: '',
        },
      ],
    },
    address: {
      addressBpn: '',
      name: '',
      addressType: '',
      physicalPostalAddress: {
        geographicCoordinates: {
          longitude: 0,
          latitude: 0,
          altitude: 0,
        },
        country: '',
        administrativeAreaLevel1: '',
        administrativeAreaLevel2: '',
        administrativeAreaLevel3: '',
        postalCode: '',
        city: '',
        district: '',
        street: {
          namePrefix: '',
          additionalNamePrefix: '',
          name: '',
          nameSuffix: '',
          additionalNameSuffix: '',
          houseNumber: '',
          houseNumberSupplement: '',
          milestone: '',
          direction: '',
        },
        companyPostalCode: '',
        industrialZone: '',
        building: '',
        floor: '',
        door: '',
      },
      alternativePostalAddress: {
        geographicCoordinates: {
          longitude: 0,
          latitude: 0,
          altitude: 0,
        },
        country: '',
        administrativeAreaLevel1: '',
        postalCode: '',
        city: '',
        deliveryServiceType: '',
        deliveryServiceQualifier: '',
        deliveryServiceNumber: '',
      },
      confidenceCriteria: {
        sharedByOwner: true,
        checkedByExternalDataSource: true,
        numberOfSharingMembers: 0,
        lastConfidenceCheckAt: '',
        nextConfidenceCheckAt: '',
        confidenceLevel: 0,
      },
      states: [
        {
          validFrom: '',
          validTo: '',
          type: '',
        },
      ],
    },
    createdAt: '',
    updatedAt: '',
  },
}

const companyDataSlice = createSlice({
  name,
  initialState,
  reducers: {
    setSelectedCompanyData: (state, actions) => ({
      ...state,
      row: actions.payload,
    }),
    setSelectedCompanyStatus: (state, actions) => ({
      ...state,
      status: actions.payload,
    }),
  },
})

export const companyDataSelector = (state: RootState): CompanyDataType =>
  state.companyData.row

export const statusSelector = (state: RootState): string =>
  state.companyData.status

export const { setSelectedCompanyData, setSelectedCompanyStatus } =
  companyDataSlice.actions

export default companyDataSlice
