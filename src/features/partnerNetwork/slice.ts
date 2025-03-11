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

import { createSlice } from '@reduxjs/toolkit'
import {
  type PartnerNetworkInitialState,
  type PartnerNetworkDataGrid,
  type PaginationData,
} from './types'
import {
  mapSingleBusinessPartnerToDataGrid,
  mapBusinessPartnerToDataGrid,
} from 'utils/dataMapper'
import type { RootState } from 'features/store'
import { apiSlice } from './apiSlice'

const initialState: PartnerNetworkInitialState = {
  paginationData: {} as PaginationData,
  mappedPartnerList: [],
  membershipData: [],
  membershipError: '',
  loading: true,
  error: '',
}

const partnerNetworkSlice = createSlice({
  name: 'partnerNetwork',
  initialState,
  reducers: {
    resetPartnerNetworkState: (state) => {
      state.mappedPartnerList = []
    },
    clearNotification: (state) => {
      state.membershipError = ''
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.getBusinessPartnerByBpn.matchFulfilled,
      (state, { payload }) => {
        const mappedList = [
          mapSingleBusinessPartnerToDataGrid(payload),
        ] as Array<PartnerNetworkDataGrid>
        state.mappedPartnerList = mappedList
        state.paginationData = {
          totalElements: mappedList.length,
          page: 1,
        }
        state.loading = false
      }
    )

    builder.addMatcher(
      apiSlice.endpoints.getAllBusinessPartners.matchFulfilled,
      (state, { payload }) => {
        try {
          state.mappedPartnerList = [
            ...state.mappedPartnerList,
            ...mapBusinessPartnerToDataGrid(payload, state.membershipData),
          ]
          state.loading = false
          state.paginationData = {
            totalElements: payload.totalElements,
            page: payload.page,
          }
        } catch (error: unknown) {
          state.loading = false
          state.error = (error as Error).message
        }
      }
    )

    builder.addMatcher(
      apiSlice.endpoints.getAllMemberCompanies.matchFulfilled,
      (state, { payload }) => {
        state.membershipData = payload
        state.membershipError = ''
      }
    )

    builder.addMatcher(
      apiSlice.endpoints.getAllMemberCompanies.matchRejected,
      (state, action) => {
        state.membershipData = []
        state.membershipError = action.error.message!
      }
    )
  },
})

export const partnerNetworkSelector = (
  state: RootState
): PartnerNetworkInitialState => state.partnerNetwork

export const { resetPartnerNetworkState, clearNotification } =
  partnerNetworkSlice.actions

export default partnerNetworkSlice.reducer
