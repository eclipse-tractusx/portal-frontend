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

import type { PaginFetchArgs } from '@arena2036/portal-shared-components-construct-x'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getSsiBase } from 'services/EnvironmentService'
import { PAGE_SIZE } from 'types/Constants'
import { apiBaseQuery } from 'utils/rtkUtil'

export enum StatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  REVOKED = 'REVOKED',
}

export type SSIDetailData = {
  credentialId: string
  participationStatus: string
  expiryDate: string
  document: {
    documentId: string
    documentName: string
  }
}

export type CertificateResponse = {
  credentialType: string
  ssiDetailData: SSIDetailData[] | null
}

export type CertificateRequest = {
  credentialType: string
  document: File
}

export type PaginationData = {
  totalElements: number
  page: number
}

export type CredentialData = {
  credentialDetailId: string
  companyId: string
  credentialType: string
  useCase: string
  participantStatus: StatusEnum
  expiryDate: string
  documents: Array<{
    documentId: string
    documentName: string
  }>
  externalTypeDetail: {
    id: string
    verifiedCredentialExternalTypeId: string
    version: string
    template: string
    validFrom: string
    expiry: string
  }
}

export type CredentialResponse = {
  content: Array<CredentialData>
  meta: PaginationData
}

export const apiSlice = createApi({
  reducerPath: 'rtk/admin/certification',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  tagTypes: ['certificate'],
  endpoints: (builder) => ({
    fetchCertificates: builder.query<CertificateResponse[], void>({
      query: () => 'api/administration/companydata/certificates',
      providesTags: ['certificate'],
    }),
    addCertificate: builder.mutation<void, CertificateRequest>({
      query: (body) => {
        const formData = new FormData()
        formData.append('credentialType', body.credentialType)
        formData.append('document', body.document)
        return {
          url: 'api/administration/companydata/certificates',
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: ['certificate'],
    }),
    fetchCredentialsSearch: builder.query<CredentialResponse[], PaginFetchArgs>(
      {
        query: (fetchArgs) => {
          if (fetchArgs.args.filterType && fetchArgs.args.sortingType) {
            return `${getSsiBase()}/api/issuer?page=${
              fetchArgs.page
            }&size=${PAGE_SIZE}&sorting=${
              fetchArgs.args.sortingType ?? ''
            }&companySsiDetailStatusId=${fetchArgs.args.filterType}`
          } else {
            return `${getSsiBase()}/api/issuer?page=${
              fetchArgs.page
            }&size=${PAGE_SIZE}`
          }
        },
      }
    ),
    approveCredential: builder.mutation<boolean, string>({
      query: (credentialId) => ({
        url: `${getSsiBase()}/api/issuer/${credentialId}/approval`,
        method: 'PUT',
      }),
    }),
    declineCredential: builder.mutation<boolean, string>({
      query: (credentialDetailId) => ({
        url: `${getSsiBase()}/api/issuer/${credentialDetailId}/reject`,
        method: 'PUT',
      }),
    }),
    fetchCertificateTypes: builder.query<string[], void>({
      query: () => '/api/administration/companydata/certificateTypes',
    }),
    revokeCredential: builder.mutation<string, string>({
      query: (credentialId) => ({
        url: `${getSsiBase()}/api/revocation/issuer/credentials/${credentialId}`,
        method: 'POST',
      }),
    }),
    fetchSsiDocumentById: builder.mutation({
      query: (documentId) => ({
        url: `${getSsiBase()}/api/credential/documents/${documentId}`,
        responseHandler: async (response) => ({
          headers: response.headers,
          data: await response.blob(),
        }),
      }),
    }),
  }),
})

export const {
  useFetchCertificatesQuery,
  useAddCertificateMutation,
  useFetchCredentialsSearchQuery,
  useApproveCredentialMutation,
  useDeclineCredentialMutation,
  useFetchCertificateTypesQuery,
  useRevokeCredentialMutation,
  useFetchSsiDocumentByIdMutation,
} = apiSlice
