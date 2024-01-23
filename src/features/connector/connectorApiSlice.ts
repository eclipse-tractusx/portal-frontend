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
import { apiBaseQuery } from 'utils/rtkUtil'
import type {
  PaginFetchArgs,
  PaginResult,
} from '@nidhi.garg/portal-shared-components'

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
  file?: File
}

export type ConnectorResponseBody = {
  name: string
  status: ConnectType
  location: string
  id: string
  type: string
}

export interface EdcSubscriptionsType {
  connectorIds: string[]
  customerName: string
  offerName: string
  subscriptionId: string
  name?: string
}

export interface OperatorBpnType {
  operatorName: string
  bpn: string
}

export const apiSlice = createApi({
  reducerPath: 'rtk/admin/connector',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    createConnector: builder.mutation({
      query: (body) => ({
        url: '/api/administration/connectors',
        method: 'POST',
        body,
      }),
    }),
    createManagedConnector: builder.mutation({
      query: (body) => ({
        url: '/api/administration/connectors/managed',
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
    fetchConnectors: builder.query<
      PaginResult<ConnectorResponseBody>,
      PaginFetchArgs
    >({
      query: (filters) =>
        `/api/administration/Connectors?page=${filters.page}&size=10`,
    }),
    fetchManagedConnectors: builder.query<
      PaginResult<ConnectorResponseBody>,
      PaginFetchArgs
    >({
      query: (filters) =>
        `/api/administration/connectors/managed?page=${filters.page}&size=10`,
    }),
    fetchOfferSubscriptions: builder.query<EdcSubscriptionsType[], void>({
      query: () => ({
        url: '/api/administration/Connectors/offerSubscriptions?connectorIdSet=false',
      }),
      transformResponse: (response: EdcSubscriptionsType[]) => {
        const obj = response.map((res: EdcSubscriptionsType) => {
          return {
            ...res,
            name: res.customerName + ' - ' + res.offerName,
          }
        })
        return obj
      },
    }),
    fetchOperatorBpn: builder.query<OperatorBpnType[], void>({
      query: () => '/api/administration/staticdata/operator-bpn',
    }),
  }),
})

export const {
  useCreateConnectorMutation,
  useCreateManagedConnectorMutation,
  useDeleteConnectorMutation,
  useFetchConnectorsQuery,
  useFetchManagedConnectorsQuery,
  useFetchOfferSubscriptionsQuery,
  useFetchOperatorBpnQuery,
} = apiSlice
