/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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
import { PaginFetchArgs, PaginResult } from 'cx-portal-shared-components'

export enum ConnectType {
  MANAGED_CONNECTOR = 'MANAGED_CONNECTOR',
  COMPANY_CONNECTOR = 'COMPANY_CONNECTOR',
  CONNECTOR_AS_A_SERVICE = 'CONNECTOR_AS_A_SERVICE',
}

export type ConnectorType = {
  title?: string
  type?: ConnectType
  subTitle?: string
  descritpion?: string
  id?: number
}

export enum ConnectorStatusType {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
}

export type ConnectorCreateBody = {
  name: string
  connectorUrl: string
  status?: ConnectorStatusType
  location?: string
  providerBpn?: string
  file?: any
}

export type ConnectorResponseBody = {
  name: string
  status: ConnectType
  location: string
  id: string
  type: string
  DapsRegistrationSuccessful?: boolean
}

export const apiSlice = createApi({
  reducerPath: 'rtk/admin/connector',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    createConnector: builder.mutation({
      query: (body) => ({
        url: `/api/administration/connectors/daps`,
        method: 'POST',
        body,
      }),
    }),
    createManagedConnector: builder.mutation({
      query: (body) => ({
        url: `/api/administration/connectors/managed-daps`,
        method: 'POST',
        body,
      }),
    }),
    deleteConnector: builder.mutation<void, string>({
      query: (connectorID) => ({
        url: `/api/administration/Connectors/${connectorID}`,
        method: 'DELETE',
      }),
    }),
    triggerDaps: builder.mutation<void, any>({
      query: (data) => {
        const body = new FormData()
        body.append('Certificate', data.file)
        return {
          url: `/api/administration/Connectors/trigger-daps/${data.connectorId}`,
          method: 'POST',
          body,
        }
      },
    }),
    fetchConnectors: builder.query<
      PaginResult<ConnectorResponseBody>,
      PaginFetchArgs
    >({
      query: (filters) =>
        `/api/administration/Connectors?page=${filters.page}&size=10`,
    }),
  }),
})

export const {
  useCreateConnectorMutation,
  useCreateManagedConnectorMutation,
  useDeleteConnectorMutation,
  useFetchConnectorsQuery,
  useTriggerDapsMutation,
} = apiSlice
