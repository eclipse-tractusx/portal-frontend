/********************************************************************************
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
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

export const apiSlice = createApi({
  reducerPath: 'rtk/appFavorites',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    getItems: builder.query<string[], void>({
      query: () => '/api/apps/favourites',
    }),
    addItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/apps/${id}/favourite`,
        method: 'POST',
      }),
    }),
    removeItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/apps/${id}/favourite`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useGetItemsQuery, useAddItemMutation, useRemoveItemMutation } =
  apiSlice
