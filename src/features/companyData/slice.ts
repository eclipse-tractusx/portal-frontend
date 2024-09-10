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
import {
  type SharingStateType,
  type CompanyDataType,
} from './companyDataApiSlice'

const name = 'companies/companyData'

export interface CompanyDataState {
  row: CompanyDataType
  status: string
  sharingStateInfo: SharingStateType
  refetchState: boolean
}

export const companyDataInitialData: CompanyDataType = {
  externalId: '',
  nameParts: [''],
  identifiers: [
    {
      type: null,
      value: null,
      issuingBody: null,
    },
  ],
  states: [
    {
      validFrom: null,
      validTo: null,
      type: 'ACTIVE',
    },
  ],
  roles: ['SUPPLIER'],
  isOwnCompanyData: true,
  legalEntity: {
    legalEntityBpn: '',
    legalName: '',
    shortName: '',
    legalForm: null,
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
        validFrom: null,
        validTo: null,
        type: 'ACTIVE',
      },
    ],
  },
  site: {
    siteBpn: null,
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
        validFrom: null,
        validTo: null,
        type: 'ACTIVE',
      },
    ],
  },
  address: {
    addressBpn: null,
    name: null,
    addressType: '',
    physicalPostalAddress: {
      geographicCoordinates: {
        longitude: 0,
        latitude: 0,
        altitude: 0,
      },
      country: '',
      administrativeAreaLevel1: null,
      administrativeAreaLevel2: null,
      administrativeAreaLevel3: null,
      postalCode: '',
      city: '',
      district: null,
      street: {
        namePrefix: null,
        additionalNamePrefix: null,
        name: '',
        nameSuffix: null,
        additionalNameSuffix: null,
        houseNumber: null,
        houseNumberSupplement: null,
        milestone: null,
        direction: null,
      },
      companyPostalCode: null,
      industrialZone: null,
      building: null,
      floor: null,
      door: null,
    },
    alternativePostalAddress: null,
    confidenceCriteria: {
      sharedByOwner: true,
      checkedByExternalDataSource: true,
      numberOfSharingMembers: 0,
      lastConfidenceCheckAt: null,
      nextConfidenceCheckAt: null,
      confidenceLevel: 0,
    },
    states: [
      {
        validFrom: null,
        validTo: null,
        type: 'ACTIVE',
      },
    ],
  },
  createdAt: '',
  updatedAt: '',
}

export const initialState: CompanyDataState = {
  status: '',
  row: companyDataInitialData,
  sharingStateInfo: {
    externalId: '',
    sharingStateType: '',
    sharingErrorCode: '',
    sharingErrorMessage: '',
    sharingProcessStarted: '',
    taskId: '',
  },
  refetchState: false,
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
    setSharingStateInfo: (state, actions) => ({
      ...state,
      sharingStateInfo: actions.payload,
    }),
    setCompanyPageRefetch: (state, actions) => ({
      ...state,
      refetchState: actions.payload,
    }),
  },
})

export const companyDataSelector = (state: RootState): CompanyDataType =>
  state.companyData.row

export const statusSelector = (state: RootState): string =>
  state.companyData.status

export const sharingStateInfoSelector = (state: RootState): SharingStateType =>
  state.companyData.sharingStateInfo

export const companyRefetch = (state: RootState): boolean =>
  state.companyData.refetchState

export const {
  setSelectedCompanyData,
  setSelectedCompanyStatus,
  setSharingStateInfo,
  setCompanyPageRefetch,
} = companyDataSlice.actions

export default companyDataSlice
