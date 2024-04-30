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

import { createSlice } from '@reduxjs/toolkit'
import {
  type CompanyDetail,
  type RegistrationRequestAPIResponse,
  type RegistrationRequestDataGrid,
  type AdminRegistrationState,
  initialState,
  name,
  type InvitesDataGrid,
} from './types'
import {
  fetchRegistrationRequests,
  fetchCompanyDetail,
  fetchPage,
} from './actions'
import { initialPaginResult, RequestState } from 'types/MainTypes'
import { mapRegistrationRequestResponseToDataGrid } from 'utils/dataMapper'
import type { RootState } from 'features/store'
import type { PaginationData } from '../../connector/types'
import uniq from 'lodash.uniq'
import type { PaginResult } from '@catena-x/portal-shared-components'

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
    builder.addCase(fetchRegistrationRequests.pending, (state) => {
      state.paginationData = {} as PaginationData
      state.loading = true
      state.error = ''
    })
    builder.addCase(
      fetchRegistrationRequests.fulfilled,
      (state, { payload }) => {
        const payloadList = payload as unknown as RegistrationRequestAPIResponse

        state.paginationData = {
          totalElements: payloadList.meta.totalElements,
          page: payloadList.meta.page,
        } as PaginationData
        if (payloadList.meta.page !== 0) {
          state.registrationRequests = uniq(
            state.registrationRequests.concat(
              mapRegistrationRequestResponseToDataGrid(payloadList?.content) ||
                []
            )
          )
        } else {
          state.registrationRequests = uniq(
            mapRegistrationRequestResponseToDataGrid(payloadList?.content) || []
          )
        }
        state.loading = false
        state.error = ''
      }
    )
    builder.addCase(fetchRegistrationRequests.rejected, (state, action) => {
      state.paginationData = {} as PaginationData
      state.loading = false
      state.error = action.error.message!
    })
    builder.addCase(fetchCompanyDetail.pending, (state) => {
      state.detailLoading = true
      state.companyDetail = {} as CompanyDetail
      state.error = ''
    })
    builder.addCase(fetchCompanyDetail.fulfilled, (state, { payload }) => {
      state.companyDetail = payload as CompanyDetail
      state.detailLoading = false
      state.error = ''
    })
    builder.addCase(fetchCompanyDetail.rejected, (state, action) => {
      state.companyDetail = {} as CompanyDetail
      state.detailLoading = false
      state.error = action.error.message!
    })
    builder.addCase(fetchPage.pending, (state) => {
      state.data = initialPaginResult
      state.request = RequestState.SUBMIT
      state.error = ''
    })
    builder.addCase(fetchPage.fulfilled, (state, { payload }) => {
      state.data = payload
      state.request = RequestState.OK
      state.error = ''
    })
    builder.addCase(fetchPage.rejected, (state, action) => {
      state.data = initialPaginResult
      state.request = RequestState.ERROR
      state.error = action.error.message!
    })
  },
})

export const adminRegistrationSelector = (
  state: RootState
): AdminRegistrationState => state.admin.registration

export const registrationRequestsSelector = (
  state: RootState
): RegistrationRequestDataGrid[] =>
  state.admin.registration.registrationRequests

export const itemsSelector = (state: RootState): PaginResult<InvitesDataGrid> =>
  state.admin.registration.data

export const refetch = (state: RootState) => state.admin.registration.refresh

const Slice = { slice }

export default Slice
