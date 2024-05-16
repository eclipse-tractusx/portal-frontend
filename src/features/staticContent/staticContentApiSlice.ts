/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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
import i18next from 'i18next'
import { apiAssetQuery } from 'utils/rtkUtil'

export interface SubNavigationType {
  index: number
  title: string
  navigation: string
}

export interface UseCaseType {
  traceability: {
    title: string
    description: string
    sections: []
    subNavigation?: SubNavigationType[]
  }
  subNavigation: SubNavigationType[]
}

export interface DataSpaceType {
  dataSpace: {
    title: string
    description: string
    sections: []
    subNavigation?: SubNavigationType[]
  }
  subNavigation: SubNavigationType[]
}

export interface CompanyRolesType {
  appProvider: {
    title: string
    description: string
    sections: []
    subNavigation: SubNavigationType[]
  }
  serviceProvider: {
    title: string
    description: string
    sections: []
    subNavigation: SubNavigationType[]
  }
  conformity: {
    title: string
    description: string
    sections: []
    subNavigation: SubNavigationType[]
  }
  participant: {
    title: string
    description: string
    sections: []
    subNavigation: SubNavigationType[]
  }
  ospProvider: {
    title: string
    description: string
    sections: []
    subNavigation: SubNavigationType[]
  }
  subNavigation?: SubNavigationType[]
}

export interface CompanyType {
  title: string
  description: string
  sections: []
  subNavigation: SubNavigationType[]
}

export interface StandardLibraryType {
  rows: StdRows[]
  useCases: StdObject[]
  capabilities: StdObject[]
  roles: StdObject[]
  status: StdObject[]
  typesOfDocuments: StdObject[]
}

export interface StdRows {
  uid: number
  name: string
  title: string
  releaseOfDocument: string
  standardizationCandidate: string
  description: string
  download: string
  roles: number[]
  capabilities: number[]
  useCases: number[]
  typesOfDocuments: number[]
  status: number[]
}
export interface StdObject {
  uid: number
  name: string
  title: string
}

export const apiSlice = createApi({
  reducerPath: 'rtk/static/content',
  baseQuery: fetchBaseQuery(apiAssetQuery()),
  endpoints: (builder) => ({
    fetchStandardLibrary: builder.query<StandardLibraryType, void>({
      query: () => `/content/${i18next.language}/standards.json`,
    }),
    fetchUseCase: builder.query<UseCaseType, void>({
      query: () => `/content/${i18next.language}/usecase.json`,
    }),
    fetchCompanyRoles: builder.query<CompanyRolesType, void>({
      query: () => `/content/${i18next.language}/companyroles.json`,
    }),
    fetchDataSpace: builder.query<DataSpaceType, void>({
      query: () => `/content/${i18next.language}/dataspace.json`,
    }),
  }),
})

export const {
  useFetchStandardLibraryQuery,
  useFetchUseCaseQuery,
  useFetchCompanyRolesQuery,
  useFetchDataSpaceQuery,
} = apiSlice
