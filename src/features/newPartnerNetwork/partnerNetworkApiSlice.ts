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
import { apiBpdmPoolQuery } from 'utils/rtkUtil'
import type {
  PaginResult,
  PaginFetchArgs,
} from '@arena2036/portal-shared-components-construct-x'
import type { BusinessPartner } from './types'
import { isBPN } from 'types/Patterns'

export interface BusinessPartnerRequest {
  bpnLs: string[]
  legalName: string
}

export const apiSlice = createApi({
  reducerPath: 'rtk/admin/partnerNetwork',
  baseQuery: fetchBaseQuery(apiBpdmPoolQuery()),
  endpoints: (builder) => ({
    fetchBusinessPartnerAddress: builder.mutation<
      PaginResult<BusinessPartner>,
      BusinessPartnerRequest
    >({
      query: (body) => ({
        url: '/members/legal-entities/search?page=0&size=10',
        method: 'POST',
        body,
      }),
    }),
    fetchBusinessPartners: builder.mutation<
      PaginResult<BusinessPartner>,
      PaginFetchArgs
    >({
      query: (fetchArgs) => {
        let url = ''
        let body = {}
        if (fetchArgs.args.expr && !isBPN(fetchArgs.args.expr)) {
          url = `/members/legal-entities/search?page=${fetchArgs.page}&size=10`
          body = {
            bpnl: [],
            legalName: fetchArgs.args.expr,
          }
        } else if (isBPN(fetchArgs.args.expr)) {
          url = `/members/legal-entities/search?page=${fetchArgs.page}&size=10`
          body = {
            bpnl: [fetchArgs.args.expr],
            legalName: '',
          }
        } else {
          url = `/members/legal-entities/search?page=${fetchArgs.page}&size=10`
        }
        return {
          url,
          method: 'POST',
          body,
        }
      },
      // Add an ESLint exception until there is a solution
      // eslint-disable-next-line
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
  useFetchBusinessPartnersMutation,
} = apiSlice
