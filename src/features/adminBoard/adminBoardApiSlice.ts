/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
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
import type { StatusVariants } from '@arena2036/portal-shared-components-construct-x'
import { apiBaseQuery } from 'utils/rtkUtil'
import i18next from 'i18next'
import type { AppDetails } from 'features/apps/types'

const PAGE_SIZE = 15

export enum PrivacyPolicyType {
  COMPANY_DATA = 'COMPANY_DATA',
  USER_DATA = 'USER_DATA',
  LOCATION = 'LOCATION',
  BROWSER_HISTORY = 'BROWSER_HISTORY',
  NONE = 'NONE',
}

export interface AppRequestBody {
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

export type AppContent = {
  appId: string
  name: string
  provider: string
  status: StatusVariants
}

export type AppResponse = {
  meta: MetaBody
  content: AppContent[]
}

export type DeclineRequestType = {
  appId: string
  message: string
}

export const apiSlice = createApi({
  reducerPath: 'rtk/apps/adminBoard',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    fetchAppReleaseApps: builder.query<AppResponse, AppRequestBody>({
      query: (body) => {
        const statusId = `offerStatusIdFilter=${body.statusId}`
        const sortingType = `sorting=${body.sortingType}`
        return {
          url: `/api/apps/appreleaseprocess/inReview?size=${PAGE_SIZE}&page=${
            body.page
          }&${body.statusId && statusId}&${body.sortingType && sortingType}`,
        }
      },
    }),
    approveRequest: builder.mutation<boolean, string>({
      query: (appId) => ({
        url: `/api/apps/appreleaseprocess/${appId}/approveApp`,
        method: 'PUT',
      }),
    }),
    declineRequest: builder.mutation<boolean, DeclineRequestType>({
      query: (body) => ({
        url: `/api/apps/appreleaseprocess/${body.appId}/declineApp`,
        method: 'PUT',
        body: { message: body.message },
      }),
    }),
    fetchBoardAppDetails: builder.query<AppDetails, string>({
      query: (id: string) =>
        `/api/apps/appreleaseprocess/inReview/${id}?lang=${i18next.language}`,
    }),
  }),
})

export const {
  useFetchAppReleaseAppsQuery,
  useApproveRequestMutation,
  useDeclineRequestMutation,
  useFetchBoardAppDetailsQuery,
} = apiSlice
