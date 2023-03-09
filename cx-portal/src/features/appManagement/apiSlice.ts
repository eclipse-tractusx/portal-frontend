/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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

export type useCasesItem = {
  useCaseId: string
  name: string
  shortname: string
}

export type appLanguagesItem = {
  languageShortName: string
  languageLongNames: {
    de: string
    en: string
  }
}

export type CreateAppStep1Item = {
  title: string
  provider: string
  leadPictureUri: string
  salesManagerId: string | null
  useCaseIds: string[] | useCasesItem[]
  descriptions: {
    languageCode: string
    longDescription: string
    shortDescription: string
  }[]
  supportedLanguageCodes: string[]
  price: string
  privacyPolicies: string[]
}

export type ImageType = {
  src: string
  alt?: string
}

export type DocumentData = {
  documentId: string
  documentName: string
}

export type DocumentAppContract = {
  APP_CONTRACT: Array<DocumentData>
  APP_LEADIMAGE?: Array<DocumentData>
}

export type NewAppDetails = {
  agreements: any[]
  contactEmail: string
  contactNumber: string
  descriptions: string[]
  documents: DocumentAppContract
  images: string[]
  leadPictureUri: ImageType
  price: string
  provider: string
  providerName: string
  providerUri: string
  supportedLanguageCodes: string[]
  title: string
  useCase: string[]
}
export type AgreementType = {
  agreementId: string
  name: string
}

export type AgreementStatusType = {
  agreementId: string
  consentStatus: string | boolean
}

export type ConsentType = {
  agreements: AgreementStatusType[]
}

export type UpdateAgreementConsentType = {
  appId: string
  body: ConsentType
}

export type saveAppType = {
  appId: string
  body: CreateAppStep1Item
}

export type salesManagerType = {
  userId: string | null
  firstName: string
  lastName: string
  fullName?: string
}

export type rolesType = {
  roleId: string
  role: string
  description: string
}

export type deleteRoleType = {
  appId: string
  roleId: string
}

export type postRolesResponseType = {
  roleId: string
  roleName: string
}

export type updateRoleType = {
  appId: string
  body?: updateRolePayload[] | null
}

export type updateRolePayload = {
  role: string
  descriptions?:
    | {
        languageCode: string
        description: string
      }[]
    | null
}

export type DocumentRequestData = {
  appId: string
  documentId: string
}

export const apiSlice = createApi({
  reducerPath: 'rtk/appManagement',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    fetchUseCases: builder.query<useCasesItem[], void>({
      query: () => `/api/administration/staticdata/usecases`,
    }),
    fetchAppLanguages: builder.query<appLanguagesItem[], void>({
      query: () => `/api/administration/staticdata/languagetags`,
    }),
    addCreateApp: builder.mutation<void, CreateAppStep1Item>({
      query: (body: CreateAppStep1Item) => ({
        url: `/api/apps/appreleaseprocess/createapp`,
        method: 'POST',
        body,
      }),
    }),
    updateapp: builder.mutation<void, any>({
      query: (data: any) => {
        const { body, appId } = data
        return {
          url: `/api/apps/AppReleaseProcess/updateapp/${appId}`,
          method: 'PUT',
          body,
        }
      },
    }),
    submitapp: builder.mutation<any, string>({
      query: (appId) => ({
        url: `/api/apps/appreleaseprocess/${appId}/submit`,
        method: 'PUT',
      }),
    }),
    updateDocumentUpload: builder.mutation({
      async queryFn(
        data: { appId: string; documentTypeId: string; body: any },
        _queryApi,
        _extraOptions,
        fetchWithBaseQuery
      ) {
        const formData = new FormData()
        formData.append('document', data.body.file)

        const response = await fetchWithBaseQuery({
          url: `/api/apps/AppReleaseProcess/updateappdoc/${data.appId}/documentType/${data.documentTypeId}/documents`,
          method: 'PUT',
          body: formData,
        })
        return response.data
          ? { data: response.data }
          : { error: response.error }
      },
    }),
    fetchAppStatus: builder.query<any, string>({
      query: (appId) => `api/apps/appreleaseprocess/${appId}/appStatus`,
    }),
    fetchAgreementData: builder.query<AgreementType[], void>({
      query: () => `api/apps/AppReleaseProcess/agreementData`,
    }),
    fetchConsentData: builder.query<ConsentType, string>({
      query: (appId: string) => `/api/apps/AppReleaseProcess/consent/${appId}`,
    }),
    updateAgreementConsents: builder.mutation<void, UpdateAgreementConsentType>(
      {
        query: (data: UpdateAgreementConsentType) => ({
          url: `/api/apps/AppReleaseProcess/consent/${data.appId}/agreementConsents`,
          method: 'POST',
          body: data.body,
        }),
      }
    ),
    fetchSalesManagerData: builder.query<salesManagerType[], void>({
      query: () => `/api/apps/AppReleaseProcess/ownCompany/salesManager`,
    }),
    saveApp: builder.mutation<void, saveAppType>({
      query: (data) => ({
        url: `/api/apps/AppReleaseProcess/${data.appId}`,
        method: 'PUT',
        body: data.body,
      }),
    }),
    fetchDocumentById: builder.mutation({
      query: (data: DocumentRequestData) => ({
        url: `/api/apps/${data.appId}/appDocuments/${data.documentId}`,
        responseHandler: async (response) => ({
          headers: response.headers,
          data: await response.blob(),
        }),
      }),
    }),
    fetchRolesData: builder.query<rolesType[], string>({
      query: (appId: string) => `api/administration/user/app/${appId}/roles`,
    }),
    updateRoleData: builder.mutation<postRolesResponseType[], updateRoleType>({
      query: (data) => ({
        url: `/api/apps/appreleaseprocess/${data.appId}/role`,
        method: 'POST',
        body: data.body,
      }),
    }),
    deleteRoles: builder.mutation<void, deleteRoleType>({
      query: (data) => ({
        url: `/api/apps/appreleaseprocess/${data.appId}/role/${data.roleId}`,
        method: 'DELETE',
      }),
    }),
    deleteDocument: builder.mutation<void, string>({
      query: (documentId) => ({
        url: `/api/registration/documents/${documentId}`,
        method: 'DELETE',
      }),
    }),
    fetchNewDocumentById: builder.mutation({
      query: (documentId) => ({
        url: `/api/administration/documents/${documentId}`,
        responseHandler: async (response) => ({
          headers: response.headers,
          data: await response.blob(),
        }),
      }),
    }),
  }),
})

export const {
  useFetchUseCasesQuery,
  useFetchAppLanguagesQuery,
  useAddCreateAppMutation,
  useUpdateappMutation,
  useSubmitappMutation,
  useUpdateDocumentUploadMutation,
  useFetchAppStatusQuery,
  useFetchAgreementDataQuery,
  useFetchConsentDataQuery,
  useUpdateAgreementConsentsMutation,
  useFetchSalesManagerDataQuery,
  useSaveAppMutation,
  useFetchDocumentByIdMutation,
  useFetchRolesDataQuery,
  useUpdateRoleDataMutation,
  useDeleteRolesMutation,
  useDeleteDocumentMutation,
  useFetchNewDocumentByIdMutation,
} = apiSlice
