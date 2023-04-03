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

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiBaseQuery } from 'utils/rtkUtil'
import { PAGE_SIZE } from 'types/Constants'
import { SubscriptionRequestBody, SubscriptionResponse } from 'features/appSubscription/appSubscriptionApiSlice'

export const apiSlice = createApi({
  reducerPath: 'rtk/apps/serviceSubscription',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    fetchSubscriptions: builder.query<
      SubscriptionResponse,
      SubscriptionRequestBody
    >({
      query: (body) => {
        const statusId = `statusId=${body.statusId}`
        const sortingType = `sorting=${body.sortingType}`
        return {
          url: `/api/services/provided/subscription-status?size${PAGE_SIZE}&page=${
            body.page
          }&${body.statusId && statusId}&${body.sortingType && sortingType}`,
        }
      },
    }),
  }),
})

export const { useFetchSubscriptionsQuery } =
  apiSlice
