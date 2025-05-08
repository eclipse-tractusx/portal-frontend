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

import { createSlice } from '@reduxjs/toolkit'
import { type CompanyDetail, initialState, name } from './types'
import { initialPaginResult, RequestState } from 'types/MainTypes'
import { apiSlice } from './apiSlice'
import type { RootState } from 'features/store'

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    refreshApplicationRequest: (state, { payload }) => ({
      ...state,
      refresh: payload.refresh,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        apiSlice.endpoints.getRegistrationRequests.matchPending,
        (state) => {
          state.loading = true
          state.error = ''
        }
      )
      .addMatcher(
        apiSlice.endpoints.getRegistrationRequests.matchFulfilled,
        (state, { payload }) => {
          state.registrationRequests = payload.content ?? []
          state.paginationData = {
            totalElements: payload.meta.totalElements,
            page: payload.meta.page,
          }
          state.loading = false
          state.error = ''
        }
      )
      .addMatcher(
        apiSlice.endpoints.getRegistrationRequests.matchRejected,
        (state, { error }) => {
          state.loading = false
          state.error = error.message!
        }
      )

      .addMatcher(apiSlice.endpoints.getCompanyDetail.matchPending, (state) => {
        state.detailLoading = true
        state.companyDetail = {} as CompanyDetail
        state.error = ''
      })
      .addMatcher(
        apiSlice.endpoints.getCompanyDetail.matchFulfilled,
        (state, { payload }) => {
          state.companyDetail = payload
          state.detailLoading = false
          state.error = ''
        }
      )
      .addMatcher(
        apiSlice.endpoints.getCompanyDetail.matchRejected,
        (state, { error }) => {
          state.detailLoading = false
          state.companyDetail = {} as CompanyDetail
          state.error = error.message!
        }
      )

      .addMatcher(apiSlice.endpoints.getItems.matchPending, (state) => {
        state.data = initialPaginResult
        state.request = RequestState.SUBMIT
        state.error = ''
      })
      .addMatcher(
        apiSlice.endpoints.getItems.matchFulfilled,
        (state, { payload }) => {
          state.data = payload
          state.request = RequestState.OK
          state.error = ''
        }
      )
      .addMatcher(
        apiSlice.endpoints.getItems.matchRejected,
        (state, { error }) => {
          state.data = initialPaginResult
          state.request = RequestState.ERROR
          state.error = error.message!
        }
      )
  },
})

export const { refreshApplicationRequest } = slice.actions
export const adminRegistrationSelector = (state: RootState) =>
  state.admin.registration
export const registrationRequestsSelector = (state: RootState) =>
  state.admin.registration.registrationRequests
export const itemsSelector = (state: RootState) => state.admin.registration.data
export const refetch = (state: RootState) => state.admin.registration.refresh

export default slice.reducer
