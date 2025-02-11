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
import qs from 'qs'
import type {
  ChangeOpenApiUrlInput,
  DeleteModelByIdInput,
  FilterParams,
  ModelList,
  NewSemanticModel,
  SemanticModel,
} from './types'
import { getSemanticApiBase } from 'services/EnvironmentService'
import UserService from 'services/UserService'

export const apiSlice = createApi({
  reducerPath: 'semanticApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getSemanticApiBase()}/hub/api/v1/`,
    prepareHeaders: (headers: Headers) => {
      headers.set('authorization', `Bearer ${UserService.getToken()}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    getModels: builder.query<ModelList, FilterParams>({
      query: (filters) => `models?${qs.stringify(filters)}`,
    }),

    getStaticModels: builder.query<ModelList, void>({
      query: () => 'semanticModels/models.json',
    }),

    getModelById: builder.query<SemanticModel, string>({
      query: (id) => `models/${id}`,
    }),

    deleteModelById: builder.mutation<string, DeleteModelByIdInput>({
      query: (id) => ({
        url: `models/${id.id}`,
        method: 'DELETE',
      }),
    }),

    postSemanticModel: builder.mutation<SemanticModel, NewSemanticModel>({
      query: (model) => ({
        url: `models?type=${model.type}&status=${model.status}`,
        method: 'POST',
        body: model.model,
      }),
    }),

    changeOpenApiUrl: builder.mutation<Blob, ChangeOpenApiUrlInput>({
      query: ({ id, url }) => ({
        url: `/models/${id}/openApiUrl`,
        method: 'PATCH',
        body: { url },
      }),
    }),

    getOpenAPIUrl: builder.query<Blob, { id: string; url: string }>({
      query: ({ id, url }) => `models/${id}/openapi?baseUrl=${url}`,
    }),

    getSemanticModelById: builder.query({
      query: (encodedUrn) => `/models/${encodedUrn}`,
    }),
  }),
})

export const {
  useGetModelsQuery,
  useGetStaticModelsQuery,
  useGetModelByIdQuery,
  useDeleteModelByIdMutation,
  usePostSemanticModelMutation,
  useChangeOpenApiUrlMutation,
  useGetOpenAPIUrlQuery,
  useGetSemanticModelByIdQuery,
} = apiSlice
