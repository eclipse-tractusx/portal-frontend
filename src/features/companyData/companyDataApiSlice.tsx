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

export enum AddressType {
  LegalAndSiteMainAddress = 'LegalAndSiteMainAddress',
  LegalAddress = 'LegalAddress',
  SiteMainAddress = 'SiteMainAddress',
  AdditionalAddress = 'AdditionalAddress',
}

export type CompanyDataFieldsType = {
  siteName: string | undefined | null
  street: string | undefined | null
  postalCode: string | undefined | null
  city: string | undefined | null
  countryCode: string | undefined | null
  countryIdentifier: string | undefined | null
  identifierNumber: string | undefined | null
  addressTitle: string | undefined | null
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
      type: string | undefined | null
      value: string | undefined | null
      issuingBody: string | undefined | null
    },
  ]
  states: [
    {
      validFrom: string | undefined | null
      validTo: string | undefined | null
      type: 'ACTIVE' | 'INACTIVE'
    },
  ]
  roles: string[]
  isOwnCompanyData: boolean
  legalEntity: {
    legalEntityBpn: string | undefined | null
    legalName: string | undefined | null
    shortName: string | undefined | null
    legalForm: string | undefined | null
    confidenceCriteria: {
      sharedByOwner: boolean
      checkedByExternalDataSource: boolean
      numberOfSharingMembers: number
      lastConfidenceCheckAt: string | undefined | null
      nextConfidenceCheckAt: string | undefined | null
      confidenceLevel: number
    }
    states: [
      {
        validFrom: string | undefined | null
        validTo: string | undefined | null
        type: 'ACTIVE' | 'INACTIVE'
      },
    ]
  }
  site: {
    siteBpn: string | undefined | null
    name: string | undefined | null
    confidenceCriteria: {
      sharedByOwner: boolean
      checkedByExternalDataSource: boolean
      numberOfSharingMembers: number
      lastConfidenceCheckAt: string | undefined | null
      nextConfidenceCheckAt: string | undefined | null
      confidenceLevel: number
    }
    states: [
      {
        validFrom: string | undefined | null
        validTo: string | undefined | null
        type: 'ACTIVE' | 'INACTIVE'
      },
    ]
  }
  address: {
    addressBpn: string | undefined | null
    name: string | undefined | null
    addressType: string | undefined | null
    physicalPostalAddress: {
      geographicCoordinates: {
        longitude: number
        latitude: number
        altitude: number
      }
      country: string | undefined | null
      administrativeAreaLevel1: string | undefined | null
      administrativeAreaLevel2: string | undefined | null
      administrativeAreaLevel3: string | undefined | null
      postalCode: string | undefined | null
      city: string | undefined | null
      district: string | undefined | null
      street: {
        namePrefix: string | undefined | null
        additionalNamePrefix: string | undefined | null
        name: string | undefined | null
        nameSuffix: string | undefined | null
        additionalNameSuffix: string | undefined | null
        houseNumber: string | undefined | null
        houseNumberSupplement: string | undefined | null
        milestone: string | undefined | null
        direction: string | undefined | null
      }
      companyPostalCode: string | undefined | null
      industrialZone: string | undefined | null
      building: string | undefined | null
      floor: string | undefined | null
      door: string | undefined | null
    }
    alternativePostalAddress: {
      geographicCoordinates: {
        longitude: 0
        latitude: 0
        altitude: 0
      }
      country: string | undefined | null
      administrativeAreaLevel1: string | undefined | null
      postalCode: string | undefined | null
      city: string | undefined | null
      deliveryServiceType: string | undefined | null
      deliveryServiceQualifier: string | undefined | null
      deliveryServiceNumber: string | undefined | null
    }
    confidenceCriteria: {
      sharedByOwner: true
      checkedByExternalDataSource: true
      numberOfSharingMembers: 0
      lastConfidenceCheckAt: string | undefined | null
      nextConfidenceCheckAt: string | undefined | null
      confidenceLevel: number
    }
    states: [
      {
        validFrom: string | undefined | null
        validTo: string | undefined | null
        type: 'ACTIVE' | 'INACTIVE'
      },
    ]
  }
  createdAt: string | undefined | null
  updatedAt: string | undefined | null
}

export interface SharingStateType {
  externalId: string
  sharingStateType: string
  sharingErrorCode: string | undefined | null
  sharingErrorMessage: string | undefined | null
  sharingProcessStarted: string | undefined | null
  taskId: string | undefined | null
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
        validFrom: null,
        validTo: null,
        type: 'ACTIVE',
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
        validFrom: null,
        validTo: null,
        type: 'ACTIVE',
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
      country: null,
      administrativeAreaLevel1: null,
      postalCode: null,
      city: null,
      deliveryServiceType: null,
      deliveryServiceQualifier: null,
      deliveryServiceNumber: null,
    },
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

export const apiSlice = createApi({
  reducerPath: 'rtk/companyData',
  baseQuery: fetchBaseQuery(apiBpdmGateQuery()),
  endpoints: (builder) => ({
    fetchSharingState: builder.query<SharingStateResponse, void>({
      query: () => ({
        url: '/sharing-state?page=0&size=100',
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
    updateCompanySiteAndAddress: builder.mutation<
      CompanyDataResponse,
      CompanyDataType[]
    >({
      query: (data: CompanyDataType[]) => ({
        url: '/input/business-partners',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
})

export const {
  useFetchSharingStateQuery,
  useFetchInputCompanyBusinessPartnersMutation,
  useFetchOutputCompanyBusinessPartnersMutation,
  useUpdateCompanySiteAndAddressMutation,
} = apiSlice
