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
import { PaginResult, PaginFetchArgs } from 'cx-portal-shared-components'
import { PAGE_SIZE } from 'types/Constants'

export enum ApplicationRequestStatus {
  CREATED = 'CREATED',
  CONFIRMED = 'CONFIRMED',
  DECLINED = 'DECLINED',
  SUBMITTED = 'SUBMITTED',
}

export enum AppFilterType {
  ALL = 'All',
  INREVIEW = 'InReview',
  CLOSED = 'Closed',
}

export interface DocumentMapper {
  documentType: string
  documentId: string
}

export interface ApplicationChecklistType {
  statusId: string
  typeId: string
}

export enum ProgressStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  TO_DO = 'TO_DO',
  DONE = 'DONE',
  FAILED = 'FAILED',
}

export enum StatusType {
  REGISTRATION_VERIFICATION = 'REGISTRATION_VERIFICATION',
  BUSINESS_PARTNER_NUMBER = 'BUSINESS_PARTNER_NUMBER',
  IDENTITY_WALLET = 'IDENTITY_WALLET',
  CLEARING_HOUSE = 'CLEARING_HOUSE',
  SELF_DESCRIPTION_LP = 'SELF_DESCRIPTION_LP',
}

interface Map {
  [key: string]: string | undefined
}

export const EndUrlMap: Map = {
  RETRIGGER_IDENTITY_WALLET: 'trigger-identity-wallet',
  RETRIGGER_CLEARING_HOUSE: 'retrigger-clearinghouse',
  TRIGGER_OVERRIDE_CLEARING_HOUSE: 'override-clearinghouse',
  RETRIGGER_SELF_DESCRIPTION_LP: 'trigger-self-description',
  RETRIGGER_BUSINESS_PARTNER_NUMBER_PUSH:
    'trigger-bpn?processTypeId=RETRIGGER_BUSINESS_PARTNER_NUMBER_PUSH',
  RETRIGGER_BUSINESS_PARTNER_NUMBER_PULL:
    'trigger-bpn?processTypeId=RETRIGGER_BUSINESS_PARTNER_NUMBER_PULL',
  OVERRIDE_BUSINESS_PARTNER_NUMBER:
    'trigger-bpn?processTypeId=OVERRIDE_BUSINESS_PARTNER_NUMBER',
}

export enum RetriggerableProcessSteps {
  RETRIGGER_IDENTITY_WALLET = 'RETRIGGER_IDENTITY_WALLET',
  RETRIGGER_CLEARING_HOUSE = 'RETRIGGER_CLEARING_HOUSE',
  TRIGGER_OVERRIDE_CLEARING_HOUSE = 'TRIGGER_OVERRIDE_CLEARING_HOUSE',
  RETRIGGER_SELF_DESCRIPTION_LP = 'RETRIGGER_SELF_DESCRIPTION_LP',
  RETRIGGER_BUSINESS_PARTNER_NUMBER_PUSH = 'RETRIGGER_BUSINESS_PARTNER_NUMBER_PUSH',
  RETRIGGER_BUSINESS_PARTNER_NUMBER_PULL = 'RETRIGGER_BUSINESS_PARTNER_NUMBER_PULL',
  OVERRIDE_BUSINESS_PARTNER_NUMBER = 'OVERRIDE_BUSINESS_PARTNER_NUMBER',
}

export type ProgressButtonsProps = {
  statusId: ProgressStatus
  typeId: string
  label?: string
  highlight?: boolean
  backgroundColor?: string
  border?: string
  icon?: JSX.Element
  details?: string
  statusLabel?: string
  statusTag?: 'confirmed' | 'pending' | 'declined' | 'label'
  retriggerableProcessSteps?: string[]
}

export const progressMapper = {
  DONE: 20,
  IN_PROGRESS: 5,
  TO_DO: 0,
  FAILED: 0,
}

export interface ApplicationRequest {
  applicationId: string
  applicationStatus: ApplicationRequestStatus
  dateCreated: string
  companyName: string
  email: string
  bpn: string
  documents: Array<DocumentMapper>
  applicationChecklist: Array<ProgressButtonsProps>
}

type CheckListDetailsButton = {
  status: string
  type: string
  details: string
  retriggerableProcessSteps: string[]
}

export interface CheckListDetailsType {
  applicationChecklist: Array<CheckListDetailsButton>
}

type DeclineRequestType = {
  applicationId: string
  comment: string
}

export type DocumentRequestData = {
  appId: string
  documentId: string
}

export const apiSlice = createApi({
  reducerPath: 'rtk/admin/applicationRequest',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  tagTypes: ['checklist'],
  endpoints: (builder) => ({
    approveRequest: builder.mutation<boolean, string>({
      query: (applicationId) => ({
        url: `/api/administration/registration/application/${applicationId}/approveRequest`,
        method: 'PUT',
      }),
    }),
    declineRequest: builder.mutation<boolean, DeclineRequestType>({
      query: (obj) => ({
        url: `/api/administration/registration/application/${obj.applicationId}/declineRequest`,
        method: 'PUT',
        body: { comment: obj.comment },
      }),
    }),
    approveChecklist: builder.mutation<boolean, string>({
      query: (applicationId) => ({
        url: `/api/administration/registration/applications/${applicationId}/approve`,
        method: 'POST',
      }),
      invalidatesTags: ['checklist'],
    }),
    declineChecklist: builder.mutation<boolean, DeclineRequestType>({
      query: (obj) => ({
        url: `/api/administration/registration/applications/${obj.applicationId}/decline`,
        method: 'POST',
        body: { comment: obj.comment },
      }),
      invalidatesTags: ['checklist'],
    }),
    fetchCompanySearch: builder.query<
      PaginResult<ApplicationRequest>,
      PaginFetchArgs
    >({
      query: (fetchArgs) => {
        const isFetchArgs = fetchArgs.args && fetchArgs.args.expr
        if (
          isFetchArgs &&
          fetchArgs.args.statusFilter &&
          fetchArgs.args.statusFilter !== AppFilterType.ALL
        ) {
          return `/api/administration/registration/applications?size=${PAGE_SIZE}&page=${
            fetchArgs.page
          }&companyName=${
            fetchArgs.args!.expr
          }&companyApplicationStatusFilter=${fetchArgs.args!.statusFilter}`
        } else if (
          !isFetchArgs &&
          fetchArgs.args.statusFilter &&
          fetchArgs.args.statusFilter !== AppFilterType.ALL
        ) {
          return `/api/administration/registration/applications?size=${PAGE_SIZE}&page=${
            fetchArgs.page
          }&companyApplicationStatusFilter=${fetchArgs.args!.statusFilter}`
        } else if (
          isFetchArgs ||
          (fetchArgs.args.statusFilter &&
            fetchArgs.args.statusFilter === AppFilterType.ALL)
        ) {
          return `/api/administration/registration/applications?size=${PAGE_SIZE}&page=${
            fetchArgs.page
          }&companyName=${fetchArgs.args!.expr}`
        } else {
          return `/api/administration/registration/applications?size=${PAGE_SIZE}&page=${fetchArgs.page}`
        }
      },
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
    fetchNewDocumentById: builder.mutation({
      query: (documentId) => ({
        url: `/api/administration/registration/documents/${documentId}`,
        responseHandler: async (response) => ({
          headers: response.headers,
          data: await response.blob(),
        }),
      }),
    }),
    updateBPN: builder.mutation<boolean, any>({
      query: (args) => ({
        url: `/api/administration/registration/application/${args.applicationId}/${args.bpn}/bpn`,
        method: 'POST',
      }),
    }),
    fetchCheckListDetails: builder.query({
      query: (applicationId) => ({
        url: `api/administration/registration/applications/${applicationId}/checklistDetails`,
      }),
      providesTags: ['checklist'],
      transformResponse: (response: any) => {
        const obj = response.map((res: CheckListDetailsButton) => {
          return {
            statusId: res.status,
            typeId: res.type,
            details: res.details,
            retriggerableProcessSteps: res.retriggerableProcessSteps,
          }
        })
        return obj
      },
    }),
    retriggerProcess: builder.mutation<boolean, any>({
      query: (args) => ({
        url: `/api/administration/registration/application/${args.applicationId}/${args.endUrl}`,
        method: 'POST',
      }),
      invalidatesTags: ['checklist'],
    }),
  }),
})

export const {
  useApproveRequestMutation,
  useDeclineRequestMutation,
  useFetchCompanySearchQuery,
  useFetchDocumentByIdMutation,
  useUpdateBPNMutation,
  useFetchCheckListDetailsQuery,
  useApproveChecklistMutation,
  useDeclineChecklistMutation,
  useRetriggerProcessMutation,
  useFetchNewDocumentByIdMutation,
} = apiSlice
