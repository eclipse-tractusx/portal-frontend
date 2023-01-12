/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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
import { StatusVariants } from 'cx-portal-shared-components'
import { apiBaseQuery } from 'utils/rtkUtil'

const PAGE_SIZE = 15

export interface AppRequestBody {
  page: number
  statusId: string
  sortingType: string
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

export const apiSlice = createApi({
  reducerPath: 'rtk/apps/adminBoard',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    fetchAppReleaseApps: builder.query<AppResponse, AppRequestBody>({
      query: (body) => {
        const statusId = `statusId=${body.statusId}`
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
    declineRequest: builder.mutation<boolean, string>({
      query: (appId) => ({
        url: `/api/apps/appreleaseprocess/${appId}/declineApp`,
        method: 'PUT',
      }),
    }),
  }),
})

export const {
  useFetchAppReleaseAppsQuery,
  useApproveRequestMutation,
  useDeclineRequestMutation,
} = apiSlice
