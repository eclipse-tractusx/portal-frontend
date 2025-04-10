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
import type { DocumentTypeId } from 'features/appManagement/apiSlice'
import { apiBaseQuery } from 'utils/rtkUtil'
import type { ServiceStatusDataState } from './types'
import type { PaginFetchArgs } from '@catena-x/portal-shared-components'

export enum ReleaseProcessTypes {
  APP_RELEASE = 'appRelease',
  SERVICE_RELEASE = 'serviceRelease',
}

export enum ServiceTypeIdsEnum {
  CONSULTANCY_SERVICE = 'CONSULTANCY_SERVICE',
  DATASPACE_SERVICE = 'DATASPACE_SERVICE',
  DATASPACE_SERVICES = 'Dataspace Services',
  CONSULTANCY_SERVICES = 'Consultancy Services',
}

export enum ServiceDeactivateEnum {
  SERVICE_DEACTIVATE_SUCCESS = 'service-deactivate-success',
  SERVICE_DEACTIVATE_ERROR = 'service-deactivate-error',
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

export enum ProvidedServiceStatusEnum {
  CREATED = 'CREATED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  IN_REVIEW = 'IN_REVIEW',
}

export interface ProvidedServiceType {
  id: string
  name: string
  provider: string
  status: ProvidedServiceStatusEnum
  leadPictureId?: string
}

export interface ProvidedServices {
  meta: {
    totalElements: number
    totalPages: number
    page: number
    contentSize: number
  }
  content: ProvidedServiceType[]
}

export enum StatusIdEnum {
  Active = 'Active',
  Inactive = 'Inactive',
  InReview = 'InReview',
  WIP = 'WIP',
  All = 'All',
}

export type serviceUserRolesType = {
  roleId: string
  roleName: string
  roleDescription: string | null
}

export interface TechnicalUserProfileBody {
  technicalUserProfileId: string | null
  userRoleIds: string[]
}

export type updateTechnicalUserProfile = {
  serviceId: string
  body: TechnicalUserProfileBody[]
}

export type technicalUserProfile = {
  technicalUserProfileId: string
  userRoles: {
    roleId: string
    roleName: string
    type: string
    accessiblyByProviderOnly: boolean
  }[]
}

export type ClientInfoType = {
  clientId: string
  clientUrl: string
}

export type TechnicalUserInfoType = {
  technicalUserId: string
  technicalUserPermissions: string[]
  technicalUserSecret: string
  technicalClientId: string
}

export type ActivateSubscriptionRequest = {
  requestId: string
  offerUrl: string
}

export type ActivateSubscriptionResponse = {
  technicalUserInfo: Array<TechnicalUserInfoType>
  clientInfo: ClientInfoType
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
        url: '/api/services/serviceRelease/addservice',
        method: 'POST',
        body: data.body,
      }),
    }),
    saveService: builder.mutation<void, createServiceType>({
      query: (data) => ({
        url: `/api/services/serviceRelease/${data.id}`,
        method: 'PUT',
        body: data.body,
      }),
    }),
    fetchServiceTypeIds: builder.query<ServiceTypeIdsType, void>({
      query: () => '/api/services/servicerelease/serviceTypes',
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
      query: () => 'api/services/servicerelease/agreementData',
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
          url: `/api/services/serviceRelease/updateservicedoc/${data.appId}/documentType/${data.documentTypeId}/documents`,
          method: 'PUT',
          body: formData,
        })
        return response.data
          ? { data: response.data }
          : { error: response.error }
      },
    }),
    submitService: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/services/serviceRelease/${id}/submit`,
        method: 'PUT',
      }),
    }),
    fetchDocument: builder.mutation({
      query: (obj) => ({
        url: `/api/services/${obj.appId}/serviceDocuments/${obj.documentId}`,
        responseHandler: async (response) => ({
          headers: response.headers,
          data: await response.blob(),
        }),
      }),
    }),
    fetchProvidedServices: builder.query<ProvidedServices, PaginFetchArgs>({
      query: (fetchArgs) => {
        const url = `/api/services/provided?page=${fetchArgs.page}&size=15`
        if (fetchArgs?.args?.statusFilter && !fetchArgs?.args?.expr) {
          return `${url}&statusId=${fetchArgs?.args?.statusFilter}`
        } else if (fetchArgs?.args?.expr && !fetchArgs?.args?.statusFilter) {
          return `${url}&statusId=${StatusIdEnum.All}&offerName=${fetchArgs?.args?.expr}`
        } else if (fetchArgs?.args?.expr && fetchArgs?.args?.statusFilter) {
          return `${url}&statusId=${fetchArgs?.args?.statusFilter}&offerName=${fetchArgs?.args?.expr}`
        } else {
          return `${url}&statusId=${StatusIdEnum.All}`
        }
      },
    }),
    deleteDocument: builder.mutation<void, string>({
      query: (documentId) => ({
        url: `/api/services/servicerelease/documents/${documentId}`,
        method: 'DELETE',
      }),
    }),
    fetchServiceUserRoles: builder.query<serviceUserRolesType[], void>({
      query: () => 'api/administration/serviceaccount/user/roles',
    }),
    fetchServiceTechnicalUserProfiles: builder.query<
      technicalUserProfile[],
      string
    >({
      query: (serviceId) =>
        `/api/services/servicerelease/${serviceId}/technical-user-profiles`,
    }),
    saveServiceTechnicalUserProfiles: builder.mutation<
      void,
      updateTechnicalUserProfile
    >({
      query: (data) => ({
        url: `/api/services/servicerelease/${data.serviceId}/technical-user-profiles`,
        method: 'PUT',
        body: data.body,
      }),
    }),
    activateSubscription: builder.mutation<
      ActivateSubscriptionResponse,
      ActivateSubscriptionRequest
    >({
      query: (data) => ({
        url: '/api/services/autoSetup',
        method: 'POST',
        body: data,
      }),
    }),
    deactivateService: builder.mutation<void, string>({
      query: (serviceId) => ({
        url: `/api/services/ServiceChange/${serviceId}/deactivateService`,
        method: 'PUT',
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
  useSubmitServiceMutation,
  useFetchDocumentMutation,
  useFetchProvidedServicesQuery,
  useDeleteDocumentMutation,
  useFetchServiceUserRolesQuery,
  useFetchServiceTechnicalUserProfilesQuery,
  useSaveServiceTechnicalUserProfilesMutation,
  useActivateSubscriptionMutation,
  useDeactivateServiceMutation,
} = apiSlice
