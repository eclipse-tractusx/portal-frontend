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

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiBaseQuery } from 'utils/rtkUtil'
import type { AppStatusDataState, TechnicalUserProfiles } from './types'
import i18next from 'i18next'

export type useCasesItem = {
  useCaseId: string
  name: string
  shortname: string
}

export type appLanguagesItem = {
  languageShortName: string
  languageLongNames: {
    language: string
    longDescription: string
  }[]
}

export type CreateAppStep1Item = {
  title: string
  provider: string
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
  roleId?: string
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

export enum ConsentStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}

export enum DocumentTypeId {
  CX_FRAME_CONTRACT = 'CX_FRAME_CONTRACT',
  COMMERCIAL_REGISTER_EXTRACT = 'COMMERCIAL_REGISTER_EXTRACT',
  APP_CONTRACT = 'APP_CONTRACT',
  CONFORMITY_APPROVAL_REGISTRATION = 'CONFORMITY_APPROVAL_REGISTRATION',
  ADDITIONAL_DETAILS = 'ADDITIONAL_DETAILS',
  APP_LEADIMAGE = 'APP_LEADIMAGE',
  APP_IMAGE = 'APP_IMAGE',
  SELF_DESCRIPTION = 'SELF_DESCRIPTION',
  APP_TECHNICAL_INFORMATION = 'APP_TECHNICAL_INFORMATION',
  CONFORMITY_APPROVAL_CONNECTOR = 'CONFORMITY_APPROVAL_CONNECTOR',
  CONFORMITY_APPROVAL_BUSINESS_APPS = 'CONFORMITY_APPROVAL_BUSINESS_APPS',
  SERVICE_LEADIMAGE = 'SERVICE_LEADIMAGE',
  CONFORMITY_APPROVAL_SERVICES = 'CONFORMITY_APPROVAL_SERVICES',
}

export interface PrivacyPolicyType {
  privacyPolicies: string[] | []
}

export type userRolesType = {
  roleId: string
  roleName: string
  roleDescription: string | null
}

export interface UpdateTechnicalUserProfileBody {
  technicalUserProfileId: string | null
  userRoleIds: string[]
}

export type updateTechnicalUserProfiles = {
  appId: string
  body: UpdateTechnicalUserProfileBody[]
}

export type technicalUserProfiles = {
  technicalUserProfileId: string
  userRoles: {
    roleId: string
    roleName: string
  }[]
}

export type saveDescriptionTypes = {
  appId: string
  body: descriptionTypes[]
}

export type descriptionTypes = {
  languageCode: string
  longDescription: string
  shortDescription: string
}

export type RolesTypes = {
  roleId: string
  role: string
  description: string
}

export type UpdateRolesTypes = {
  appId: string
  body: {
    role: string
    descriptions: {
      languageCode: string
      description: string
    }[]
  }[]
}

export type ChangeDocumentsTypes = {
  documents: {
    APP_IMAGE: DocumentData[] | []
    APP_TECHNICAL_INFORMATION: DocumentData[] | []
    APP_CONTRACT: DocumentData[] | []
    ADDITIONAL_DETAILS: DocumentData[] | []
  }
}

enum Tags {
  APP = 'App',
}

export const apiSlice = createApi({
  reducerPath: 'rtk/appManagement',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  tagTypes: [Tags.APP],
  endpoints: (builder) => ({
    fetchUseCases: builder.query<useCasesItem[], void>({
      query: () => '/api/administration/staticdata/usecases',
    }),
    fetchAppLanguages: builder.query<appLanguagesItem[], void>({
      query: () => '/api/administration/staticdata/languagetags',
    }),
    addCreateApp: builder.mutation<void, CreateAppStep1Item>({
      query: (body: CreateAppStep1Item) => ({
        url: '/api/apps/appReleaseProcess/createApp',
        method: 'POST',
        body,
      }),
    }),
    submitapp: builder.mutation<void, string>({
      query: (appId) => ({
        url: `/api/apps/appReleaseProcess/${appId}/submit`,
        method: 'PUT',
      }),
    }),
    updateDocumentUpload: builder.mutation({
      async queryFn(
        data: { appId: string; documentTypeId: string; body: { file: File } },
        _queryApi,
        _extraOptions,
        fetchWithBaseQuery
      ) {
        const formData = new FormData()
        formData.append('document', data.body.file)

        const response = await fetchWithBaseQuery({
          url: `/api/apps/appReleaseProcess/updateAppDoc/${data.appId}/documentType/${data.documentTypeId}/documents`,
          method: 'PUT',
          body: formData,
        })
        return response.data
          ? { data: response.data }
          : { error: response.error }
      },
      invalidatesTags: [Tags.APP],
    }),
    fetchAppStatus: builder.query<AppStatusDataState, string>({
      query: (appId) =>
        `api/apps/appReleaseProcess/${appId}/appStatus?languageShortName=${i18next.language}`,
      providesTags: [Tags.APP],
    }),
    fetchAgreementData: builder.query<AgreementType[], void>({
      query: () =>
        `api/apps/appReleaseProcess/agreementData?languageShortName=${i18next.language}`,
    }),
    fetchConsentData: builder.query<ConsentType, string>({
      query: (appId: string) => `/api/apps/appReleaseProcess/consent/${appId}`,
    }),
    updateAgreementConsents: builder.mutation<void, UpdateAgreementConsentType>(
      {
        query: (data: UpdateAgreementConsentType) => ({
          url: `/api/apps/appReleaseProcess/consent/${data.appId}/agreementConsents`,
          method: 'POST',
          body: data.body,
        }),
      }
    ),
    fetchSalesManagerData: builder.query<salesManagerType[], void>({
      query: () => '/api/apps/appReleaseProcess/ownCompany/salesManager',
    }),
    saveApp: builder.mutation<void, saveAppType>({
      query: (data) => ({
        url: `/api/apps/appReleaseProcess/${data.appId}`,
        method: 'PUT',
        body: data.body,
      }),
    }),
    deleteAppReleaseDocument: builder.mutation<void, string>({
      query: (documentId) => ({
        url: `/api/apps/appReleaseProcess/documents/${documentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [Tags.APP],
    }),
    fetchAppRolesData: builder.query<updateRolePayload[], string>({
      query: (appId: string) =>
        `/api/apps/appReleaseProcess/${appId}/roles?languageShortName=${i18next.language}`,
    }),
    updateRoleData: builder.mutation<postRolesResponseType[], updateRoleType>({
      query: (data) => ({
        url: `/api/apps/appReleaseProcess/${data.appId}/role`,
        method: 'POST',
        body: data.body,
      }),
    }),
    deleteRoles: builder.mutation<void, deleteRoleType>({
      query: (data) => ({
        url: `/api/apps/appReleaseProcess/${data.appId}/role/${data.roleId}`,
        method: 'DELETE',
      }),
    }),
    fetchNewDocumentById: builder.mutation({
      query: (documentId) => ({
        url: `/api/registration/documents/${documentId}`,
        responseHandler: async (response) => ({
          headers: response.headers,
          data: await response.blob(),
        }),
      }),
    }),
    fetchPrivacyPolicies: builder.query<PrivacyPolicyType, void>({
      query: () => '/api/apps/appReleaseProcess/privacyPolicies',
    }),
    fetchFrameDocumentById: builder.mutation({
      query: (documentId) => ({
        url: `/api/administration/documents/frameDocuments/${documentId}`,
        responseHandler: async (response) => ({
          headers: response.headers,
          data: await response.blob(),
        }),
      }),
    }),
    fetchUserRoles: builder.query<userRolesType[], void>({
      query: () => 'api/administration/serviceaccount/user/roles',
    }),
    fetchTechnicalUserProfiles: builder.query<TechnicalUserProfiles[], string>({
      query: (appId) =>
        `/api/apps/appReleaseProcess/${appId}/technical-user-profiles`,
    }),
    saveTechnicalUserProfiles: builder.mutation<
      void,
      updateTechnicalUserProfiles
    >({
      query: (data) => ({
        url: `/api/apps/appReleaseProcess/${data.appId}/technical-user-profiles`,
        method: 'PUT',
        body: data.body,
      }),
    }),
    updateImageData: builder.mutation({
      async queryFn(
        data: { appId: string; body: { file: File } },
        _queryApi,
        _extraOptions,
        fetchWithBaseQuery
      ) {
        const formData = new FormData()
        formData.append('document', data.body.file)

        const response = await fetchWithBaseQuery({
          url: `/api/apps/appChange/${data.appId}/appLeadImage`,
          method: 'POST',
          body: formData,
        })
        return response.data
          ? { data: response.data }
          : { error: response.error }
      },
      invalidatesTags: [Tags.APP],
    }),
    fetchDescription: builder.query<descriptionTypes[], string>({
      query: (appId) => `/api/apps/appChange/${appId}/appupdate/description`,
    }),
    saveDescription: builder.mutation<void, saveDescriptionTypes>({
      query: (data) => ({
        url: `/api/apps/appChange/${data.appId}/appupdate/description`,
        method: 'PUT',
        body: data.body,
      }),
    }),
    fetchAppRoles: builder.query<RolesTypes[], string>({
      query: (appId) =>
        `/api/apps/appChange/${appId}/roles?languageShortName=${i18next.language}`,
    }),
    updateActiveApp: builder.mutation<
      postRolesResponseType[],
      UpdateRolesTypes
    >({
      query: (data) => ({
        url: `/api/apps/appChange/${data.appId}/role/activeapp`,
        method: 'POST',
        body: data.body,
      }),
    }),
    fetchAppDocuments: builder.query<ChangeDocumentsTypes, string>({
      query: (appId) => `api/apps/appChange/${appId}/documents`,
    }),
    deleteAppChangeDocument: builder.mutation<void, DocumentRequestData>({
      query: (data) => ({
        url: `/api/apps/appChange/${data.appId}/document/${data.documentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [Tags.APP],
    }),
    updateAppChangeDocument: builder.mutation({
      async queryFn(
        data: { documentTypeId: string; appId: string; body: { file: File } },
        _queryApi,
        _extraOptions,
        fetchWithBaseQuery
      ) {
        const docFormData = new FormData()
        docFormData.append('document', data.body.file)

        const result = await fetchWithBaseQuery({
          url: `api/apps/appChange/${data.appId}/documentType/${data.documentTypeId}/documents`,
          method: 'POST',
          body: docFormData,
        })
        return result.data ? { data: result.data } : { error: result.error }
      },
      invalidatesTags: [Tags.APP],
    }),
  }),
})

export const {
  useFetchUseCasesQuery,
  useFetchAppLanguagesQuery,
  useAddCreateAppMutation,
  useSubmitappMutation,
  useUpdateDocumentUploadMutation,
  useFetchAppStatusQuery,
  useFetchAgreementDataQuery,
  useFetchConsentDataQuery,
  useUpdateAgreementConsentsMutation,
  useFetchSalesManagerDataQuery,
  useSaveAppMutation,
  useDeleteAppReleaseDocumentMutation,
  useFetchAppRolesDataQuery,
  useUpdateRoleDataMutation,
  useDeleteRolesMutation,
  useFetchNewDocumentByIdMutation,
  useFetchPrivacyPoliciesQuery,
  useFetchFrameDocumentByIdMutation,
  useFetchUserRolesQuery,
  useFetchTechnicalUserProfilesQuery,
  useSaveTechnicalUserProfilesMutation,
  useUpdateImageDataMutation,
  useFetchDescriptionQuery,
  useSaveDescriptionMutation,
  useFetchAppRolesQuery,
  useUpdateActiveAppMutation,
  useFetchAppDocumentsQuery,
  useDeleteAppChangeDocumentMutation,
  useUpdateAppChangeDocumentMutation,
} = apiSlice
