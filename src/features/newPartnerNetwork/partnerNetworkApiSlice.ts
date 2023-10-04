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
import { apiBpdmQuery } from 'utils/rtkUtil'
import type {
  PaginResult,
  PaginFetchArgs,
} from '@catena-x/portal-shared-components'
import type { BusinessPartner } from './types'
import Patterns from 'types/Patterns'
import type { BusinessPartnerAddressResponse } from 'features/partnerNetwork/types'

const checkIfBPNLNumber = (text: string): boolean =>
  Patterns.BPN.test(text.trim())

export const apiSlice = createApi({
  reducerPath: 'rtk/admin/partnerNetwork',
  baseQuery: fetchBaseQuery(apiBpdmQuery()),
  endpoints: (builder) => ({
    fetchBusinessPartnerAddress: builder.mutation<
      PaginResult<BusinessPartnerAddressResponse>,
      any
    >({
      query: (arry) => ({
        url: '/catena/legal-entities/legal-addresses/search',
        method: 'POST',
        body: arry,
      }),
    }),
    fetchBusinessPartners: builder.query<
      PaginResult<BusinessPartner>,
      PaginFetchArgs
    >({
      query: (fetchArgs) => {
        if (fetchArgs.args.expr && !checkIfBPNLNumber(fetchArgs.args.expr)) {
          return `/catena/legal-entities?page=${fetchArgs.page}&size=10&name=${
            fetchArgs.args!.expr
          }`
        } else if (checkIfBPNLNumber(fetchArgs.args.expr)) {
          return `/catena/legal-entities/${fetchArgs.args!.expr}`
        } else {
          return `/catena/legal-entities?page=${fetchArgs.page}&size=10`
        }
      },
      transformResponse: (response: any) => {
        if (response.content) {
          return {
            ...response,
            meta: {
              contentSize: response.contentSize,
              page: response.page,
              totalElements: response.totalElements,
              totalPages: response.totalPages,
            },
          }
        } else {
          return {
            content: [response],
            meta: {
              contentSize: response.contentSize,
              page: response.page,
              totalElements: response.totalElements,
              totalPages: response.totalPages,
            },
          }
        }
      },
    }),
  }),
})

export const {
  useFetchBusinessPartnerAddressMutation,
  useFetchBusinessPartnersQuery,
} = apiSlice
