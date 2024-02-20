/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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

export type PaginationData = {
  totalElements: number
  page: number
}

export type ComapnyCertificateData = {
  companyCertificateType: string
  companyCertificateStatus: string
  documentId: string
  validFrom: string
  validTill: string
}

export type CompanyCertificateResponse = {
  content: Array<ComapnyCertificateData>
  meta: PaginationData
}

export interface UploadDocumentType {
  certificateType: string
  document: File
  // eslint-disable-next-line
  expiryDate: any
}

export interface CertificateTypes {
  certificateType: string
  certificateVersion: string
}

export interface CertificateRequestType {
  filter: string
  sortOption: string
  page: number
}

export const apiSlice = createApi({
  reducerPath: 'rtk/admin/companyCertificate',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  tagTypes: ['certificate'],
  endpoints: (builder) => ({
    fetchCertificates: builder.query<
      CompanyCertificateResponse,
      CertificateRequestType
    >({
      query: ({ filter, sortOption, page }) =>
        `/api/administration/companydata/companyCertificates?page=${page}&certificateStatus=${filter}&sorting=${sortOption}`,
      providesTags: ['certificate'],
    }),
    fetchCertificateTypes: builder.query<CertificateTypes[], void>({
      query: () => '/api/administration/staticdata/certificateTypes',
    }),
    fetchDocument: builder.mutation({
      query: (documentId) => ({
        url: `/api/administration/documents/${documentId}`,
        responseHandler: async (response) => ({
          headers: response.headers,
          data: await response.blob(),
        }),
      }),
    }),
    uploadCertificate: builder.mutation<void, UploadDocumentType>({
      query: (body) => {
        const formData = new FormData()
        formData.append('CertificateType', body.certificateType)
        formData.append('Document', body.document)
        formData.append('ExpiryDate', body.expiryDate)
        return {
          url: 'api/administration/companydata/companyCertificate',
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: ['certificate'],
    }),
    deleteCompanyCertificate: builder.mutation<void, string>({
      query: (id) => {
        return {
          url: `/api/administration/companydata/companyCertificate/document/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['certificate'],
    }),
    fetchCompanyCertificate: builder.query<
      Array<ComapnyCertificateData>,
      string
    >({
      query: (bpn: string) =>
        `/api/administration/companydata/company/${bpn}/companyCertificates`,
    }),
  }),
})

export const {
  useFetchCertificatesQuery,
  useFetchDocumentMutation,
  useUploadCertificateMutation,
  useFetchCertificateTypesQuery,
  useDeleteCompanyCertificateMutation,
  useFetchCompanyCertificateQuery,
} = apiSlice
