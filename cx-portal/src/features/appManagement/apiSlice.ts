/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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
  salesManagerId: string
  useCaseIds: string[] | useCasesItem[]
  descriptions: {
    languageCode: string
    longDescription: string
    shortDescription: string
  }[]
  supportedLanguageCodes: string[]
  price: string
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
    addContractConsent: builder.mutation<void, any>({
      query: (body: any) => ({
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
  }),
})

export const {
  useFetchUseCasesQuery,
  useFetchAppLanguagesQuery,
  useAddCreateAppMutation,
  useAddContractConsentMutation,
  useUpdateappMutation,
  useSubmitappMutation,
  useUpdateDocumentUploadMutation,
  useFetchAppStatusQuery,
  useFetchAgreementDataQuery,
  useFetchConsentDataQuery,
  useUpdateAgreementConsentsMutation,
} = apiSlice
