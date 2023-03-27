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
import { DocumentTypeId } from 'features/appManagement/apiSlice'
import { apiBaseQuery } from 'utils/rtkUtil'
import { ServiceStatusDataState } from './types'

export enum ReleaseProcessTypes {
  APP_RELEASE = 'appRelease',
  SERVICE_RELEASE = 'serviceRelease',
}

export type CreateServiceStep1Item = {
  title?: string
  price?: string | null
  leadPictureUri?: string
  descriptions?: {
    languageCode: string
    longDescription: string
    shortDescription: string
  }[]
  privacyPolicies?: string[]
  salesManager?: string | null
  serviceTypeIds?: string[]
}

export type DocumentData = {
  documentId: string
  documentName: string
}

export type DocumentAppContract = {
  APP_CONTRACT: Array<DocumentData>
  APP_LEADIMAGE?: Array<DocumentData>
}

export type AgreementType = {
  agreementId: string
  name: string
}

export type AgreementStatusType = {
  agreementId: string
  consentStatus: ConsentStatusEnum
}

export type ConsentType = {
  agreements: AgreementStatusType[]
}

export type UpdateAgreementConsentType = {
  appId: string
  body: ConsentType
}

export type createServiceType = {
  id: string
  body: CreateServiceStep1Item
}

export interface ServiceTypeIdsType {
  serviceTypeId: number
  name: string
}

export enum ConsentStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}

enum Tags {
  REFETCH_SERVICE = 'service',
}

export const apiSlice = createApi({
  reducerPath: 'rtk/serviceManagement',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  tagTypes: [Tags.REFETCH_SERVICE],
  endpoints: (builder) => ({
    fetchServiceStatus: builder.query<ServiceStatusDataState, string>({
      query: (id) => `/api/services/servicerelease/${id}/serviceStatus`,
    }),
    createService: builder.mutation<void, createServiceType>({
      query: (data) => ({
        url: `/api/services/addService`,
        method: 'POST',
        body: data.body,
      }),
    }),
    saveService: builder.mutation<void, createServiceType>({
      query: (data) => ({
        url: `/api/services/${data.id}`,
        method: 'PUT',
        body: data.body,
      }),
    }),
    fetchServiceTypeIds: builder.query<ServiceTypeIdsType, void>({
      query: () => `/api/services/servicerelease/serviceTypes`,
    }),
    updateServiceAgreementConsents: builder.mutation<
      void,
      UpdateAgreementConsentType
    >({
      query: (data: UpdateAgreementConsentType) => ({
        url: `/api/services/servicerelease/consent/${data.appId}/agreementConsents`,
        method: 'POST',
        body: data.body,
      }),
    }),
    fetchServiceAgreementData: builder.query<AgreementType[], void>({
      query: () => `api/services/servicerelease/agreementData`,
    }),
    fetchServiceConsentData: builder.query<ConsentType, string>({
      query: (id: string) => `/api/services/servicerelease/consent/${id}`,
    }),
    updateServiceDocumentUpload: builder.mutation({
      async queryFn(
        data: {
          appId: string
          documentTypeId: DocumentTypeId
          body: { file: File }
        },
        _queryApi,
        _extraOptions,
        fetchWithBaseQuery
      ) {
        const formData = new FormData()
        formData.append('document', data.body.file)

        const response = await fetchWithBaseQuery({
          url: `/api/services/updateservicedoc/${data.appId}/documentType/${data.documentTypeId}/documents`,
          method: 'PUT',
          body: formData,
        })
        return response.data
          ? { data: response.data }
          : { error: response.error }
      },
    }),
    fetchNewDocumentById: builder.mutation({
      query: (documentId) => ({
        url: `/api/administration/documents/frameDocuments/${documentId}`,
        responseHandler: async (response) => ({
          headers: response.headers,
          data: await response.blob(),
        }),
      }),
    }),
  }),
})

export const {
  useSaveServiceMutation,
  useCreateServiceMutation,
  useFetchServiceStatusQuery,
  useFetchServiceTypeIdsQuery,
  useUpdateServiceAgreementConsentsMutation,
  useFetchServiceAgreementDataQuery,
  useFetchServiceConsentDataQuery,
  useUpdateServiceDocumentUploadMutation,
  useFetchNewDocumentByIdMutation,
} = apiSlice
