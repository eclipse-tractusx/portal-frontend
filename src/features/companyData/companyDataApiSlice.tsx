/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiBpdmGateQuery } from 'utils/rtkUtil'

export type PaginationData = {
  totalElements: number
  page: number
  totalPages: number
}

export type CompanyDataSiteType = {
  siteName: string
  street: string
  postalCode: string
  city: string
  countryCode: string
  countryIdentifier: string
  identifierNumber: string
}

export type CompanyDataAddressType = {
  companySite: string
  street: string
  postalCode: string
  city: string
  addressTitle: string
}

export interface CompanyDataRequestType {
  page: number
}

export enum Tags {
  companydata = 'companydata',
}

export interface CompanyDataResponse {
  totalElements: number
  totalPages: number
  page: number
  contentSize: number
  content: CompanyDataType[]
}

export interface CompanyDataType {
  externalId: string
  nameParts: [string]
  identifiers: [
    {
      type: string
      value: string
      issuingBody: string
    },
  ]
  states: [
    {
      validFrom: string
      validTo: string
      type: string
    },
  ]
  roles: string[]
  isOwnCompanyData: boolean
  legalEntity: {
    legalEntityBpn: string
    legalName: string
    shortName: string
    legalForm: string
    confidenceCriteria: {
      sharedByOwner: boolean
      checkedByExternalDataSource: boolean
      numberOfSharingMembers: number
      lastConfidenceCheckAt: string
      nextConfidenceCheckAt: string
      confidenceLevel: number
    }
    states: [
      {
        validFrom: string
        validTo: string
        type: string
      },
    ]
  }
  site: {
    siteBpn: string
    name: string
    confidenceCriteria: {
      sharedByOwner: boolean
      checkedByExternalDataSource: boolean
      numberOfSharingMembers: number
      lastConfidenceCheckAt: string
      nextConfidenceCheckAt: string
      confidenceLevel: number
    }
    states: [
      {
        validFrom: string
        validTo: string
        type: string
      },
    ]
  }
  address: {
    addressBpn: string
    name: string
    addressType: string
    physicalPostalAddress: {
      geographicCoordinates: {
        longitude: number
        latitude: number
        altitude: number
      }
      country: string
      administrativeAreaLevel1: string
      administrativeAreaLevel2: string
      administrativeAreaLevel3: string
      postalCode: string
      city: string
      district: string
      street: {
        namePrefix: string
        additionalNamePrefix: string
        name: string
        nameSuffix: string
        additionalNameSuffix: string
        houseNumber: string
        houseNumberSupplement: string
        milestone: string
        direction: string
      }
      companyPostalCode: string
      industrialZone: string
      building: string
      floor: string
      door: string
    }
    alternativePostalAddress: {
      geographicCoordinates: {
        longitude: 0
        latitude: 0
        altitude: 0
      }
      country: string
      administrativeAreaLevel1: string
      postalCode: string
      city: string
      deliveryServiceType: string
      deliveryServiceQualifier: string
      deliveryServiceNumber: string
    }
    confidenceCriteria: {
      sharedByOwner: true
      checkedByExternalDataSource: true
      numberOfSharingMembers: 0
      lastConfidenceCheckAt: string
      nextConfidenceCheckAt: string
      confidenceLevel: number
    }
    states: [
      {
        validFrom: string
        validTo: string
        type: string
      },
    ]
  }
  createdAt: string
  updatedAt: string
}

export interface SharingStateType {
  externalId: string
  sharingStateType: string
  sharingErrorCode: string | null | undefined
  sharingErrorMessage: string | null | undefined
  sharingProcessStarted: string | null | undefined
  taskId: string | null | undefined
}

export interface SharingStateResponse {
  totalElements: number
  totalPages: number
  page: number
  contentSize: number
  content: SharingStateType[]
}

export enum SharingStateStatusType {
  Success = 'Success',
  Ready = 'Ready',
  Pending = 'Pending',
  Error = 'Error',
  Initial = 'Initial',
}

export const apiSlice = createApi({
  reducerPath: 'rtk/companyData',
  baseQuery: fetchBaseQuery(apiBpdmGateQuery()),
  endpoints: (builder) => ({
    fetchSharingState: builder.query<SharingStateResponse, void>({
      query: () => ({
        url: '/sharing-state',
      }),
    }),
    fetchInputCompanyBusinessPartners: builder.mutation<
      CompanyDataResponse,
      string[] | void
    >({
      query: (val) => ({
        url: '/input/business-partners/search?page=0&size=100',
        method: 'POST',
        body: val,
      }),
    }),
    fetchOutputCompanyBusinessPartners: builder.mutation<
      CompanyDataResponse,
      string[] | void
    >({
      query: (val) => ({
        url: '/output/business-partners/search?page=0&size=100',
        method: 'POST',
        body: val,
      }),
    }),
  }),
})

export const {
  useFetchSharingStateQuery,
  useFetchInputCompanyBusinessPartnersMutation,
  useFetchOutputCompanyBusinessPartnersMutation,
} = apiSlice
