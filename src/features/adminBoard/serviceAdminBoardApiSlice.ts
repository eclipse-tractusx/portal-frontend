/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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
import type { StatusVariants } from '@catena-x/portal-shared-components'
import { apiBaseQuery } from 'utils/rtkUtil'
import type { DeclineRequestType } from './adminBoardApiSlice'

const PAGE_SIZE = 15

export enum PrivacyPolicyType {
  COMPANY_DATA = 'COMPANY_DATA',
  USER_DATA = 'USER_DATA',
  LOCATION = 'LOCATION',
  BROWSER_HISTORY = 'BROWSER_HISTORY',
  NONE = 'NONE',
}

export interface ServiceRequestBody {
  page: number
  statusId: string
  sortingType: string
  expr: string
}

export type MetaBody = {
  totalElements: 0
  totalPages: 0
  page: 0
  contentSize: 0
}

export type ServiceContent = {
  appId?: string
  name?: string
  id: string
  title: string
  provider: string
  status: StatusVariants
  description: string
}

export type ServiceResponse = {
  content: ServiceContent[]
  meta: MetaBody
}

export type DocumentData = {
  documentId: string
  documentName: string
}

export interface ServiceDetailsType {
  id: string
  title: string
  serviceTypes: string[]
  shortLegalName: string
  descriptions: {
    languageCode: string
    longDescription: string
    shortDescription: string
  }[]
  documents: { [key: string]: Array<DocumentData> }
  providerUri: string
  contactEmail: string
  contactNumber: null
  technicalUserProfile?: {
    [key: string]: string[] | null
  }
}

export const apiSlice = createApi({
  reducerPath: 'rtk/services/serviceAdminBoardApiSlice',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    fetchInReviewServices: builder.query<ServiceResponse, ServiceRequestBody>({
      query: (body) => {
        const statusId = body.statusId ? `&status=${body.statusId}` : ''
        const sortingType = body.sortingType
          ? `&sorting=${body.sortingType}`
          : ''
        const expr = body.expr ? `&serviceName=${body.expr}` : ''
        return {
          url: `/api/services/serviceRelease/inReview?size=${PAGE_SIZE}&page=${body.page}${statusId}${sortingType}${expr}`,
        }
      },
    }),
    fetchBoardServiceDetails: builder.query<ServiceDetailsType, string>({
      query: (id: string) => `/api/services/servicerelease/inReview/${id}`,
    }),
    approveServiceRequest: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `/api/services/serviceRelease/${id}/approveService`,
        method: 'PUT',
      }),
    }),
    declineServiceRequest: builder.mutation<boolean, DeclineRequestType>({
      query: (body) => ({
        url: `/api/services/serviceRelease/${body.appId}/declineService`,
        method: 'PUT',
        body: { message: body.message },
      }),
    }),
    fetchServiceDetails: builder.query<ServiceDetailsType, string>({
      query: (id: string) => `/api/services/serviceRelease/${id}`,
    }),
  }),
})

export const {
  useFetchInReviewServicesQuery,
  useFetchBoardServiceDetailsQuery,
  useApproveServiceRequestMutation,
  useDeclineServiceRequestMutation,
  useFetchServiceDetailsQuery,
} = apiSlice
