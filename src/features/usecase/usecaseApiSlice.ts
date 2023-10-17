/********************************************************************************
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

export type VerifiedCredentialsData = {
  externalDetailData: {
    id: string
    verifiedCredentialExternalTypeId: string
    version: string
    template: string
    validFrom: string
    expiry: string
  }
  ssiDetailData: {
    credentialId: string
    participationStatus: string
    expiryDate: string
    document: {
      documentId: string
      documentName: string
    }
  }
}

export type UsecaseResponse = {
  useCase: string
  description: string
  credentialType: string
  verifiedCredentials: VerifiedCredentialsData[]
}

export type UsecaseRequest = {
  verifiedCredentialTypeId: string
  credentialType: string
  document: File
}

export const apiSlice = createApi({
  reducerPath: 'rtk/administration/usecase',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  tagTypes: ['usecase'],
  endpoints: (builder) => ({
    fetchUsecase: builder.query<UsecaseResponse[], void>({
      query: () => '/api/administration/companydata/useCaseParticipation',
      providesTags: ['usecase'],
    }),
    addUsecase: builder.mutation<void, UsecaseRequest>({
      query: (body) => {
        const formData = new FormData()
        formData.append(
          'VerifiedCredentialExternalTypeDetailId',
          body.verifiedCredentialTypeId
        )
        formData.append('credentialType', body.credentialType)
        formData.append('document', body.document)
        return {
          url: 'api/administration/companydata/useCaseParticipation',
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: ['usecase'],
    }),
  }),
})

export const { useFetchUsecaseQuery, useAddUsecaseMutation } = apiSlice
