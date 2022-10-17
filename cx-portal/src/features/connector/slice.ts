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

import { createSlice } from '@reduxjs/toolkit'
import {
  PaginationData,
  ConnectorInitialState,
  ConnectorAPIResponse,
} from './types'
import { RootState } from 'features/store'
import { fetchConnectors, createConnector } from './actions'
import uniq from 'lodash.uniq'

const initialState: ConnectorInitialState = {
  paginationData: {} as PaginationData,
  connectorList: [],
  loading: true,
  error: '',
}

const connectorSlice = createSlice({
  name: 'connector',
  initialState,
  reducers: {
    resetConnectorState: (state) => {
      state.connectorList = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConnectors.pending, (state) => {
      state.paginationData = {} as PaginationData
      state.loading = true
    })
    builder.addCase(fetchConnectors.fulfilled, (state, { payload }) => {
      const responseList = payload as unknown as ConnectorAPIResponse
      state.connectorList = uniq(
        state.connectorList.concat(responseList.content)
      )
      state.paginationData = {
        totalElements: responseList.meta.totalElements,
        page: responseList.meta.page,
      } as PaginationData

      state.loading = false
    })
    builder.addCase(fetchConnectors.rejected, (state, action) => {
      state.paginationData = {} as PaginationData
      state.connectorList = []
      state.loading = false
      state.error = action.error.message as string
    })
    builder.addCase(createConnector.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createConnector.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(createConnector.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message as string
    })
  },
})

export const connectorSelector = (state: RootState): ConnectorInitialState =>
  state.connector

export default connectorSlice
