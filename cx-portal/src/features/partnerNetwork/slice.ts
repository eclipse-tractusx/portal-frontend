/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
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
  BusinessPartner,
  BusinessPartnerResponse,
  PaginationData,
  PartnerNetworkDataGrid,
  PartnerNetworkInitialState,
} from './types'
import { RootState } from 'features/store'
import {
  getOneBusinessPartner,
  fetchBusinessPartners,
  fetchMemberCompaniesData,
} from './actions'
import {
  mapSingleBusinessPartnerToDataGrid,
  mapBusinessPartnerToDataGrid,
} from 'utils/dataMapper'

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
    builder.addCase(getOneBusinessPartner.pending, (state) => {
      state.paginationData = {} as PaginationData
      state.mappedPartnerList = []
      state.loading = true
    })
    builder.addCase(getOneBusinessPartner.fulfilled, (state, { payload }) => {
      const bp = payload as BusinessPartner
      const mappedList = [
        mapSingleBusinessPartnerToDataGrid(bp),
      ] as Array<PartnerNetworkDataGrid>
      state.mappedPartnerList = mappedList
      state.paginationData = {
        totalElements: mappedList.length,
        page: 1, // One business partner or null can be possible values here. Page is always default 1
      } as PaginationData

      state.loading = false
    })
    builder.addCase(getOneBusinessPartner.rejected, (state, action) => {
      state.paginationData = {} as PaginationData
      state.mappedPartnerList = []
      state.loading = false
      state.error = action.error.message as string
    })
    builder.addCase(fetchBusinessPartners.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchBusinessPartners.fulfilled, (state, { payload }) => {
      const payloadList = payload as BusinessPartnerResponse
      try {
        state.mappedPartnerList = [
          ...state.mappedPartnerList,
          ...mapBusinessPartnerToDataGrid(payloadList, state.membershipData),
        ]
        state.loading = false
        state.paginationData = {
          totalElements: payloadList.totalElements,
          page: payloadList.page,
        }
      } catch (error: unknown) {
        return {
          ...state,
          loading: false,
          error: (error as Error).message,
        } as PartnerNetworkInitialState
      }
    })
    builder.addCase(fetchBusinessPartners.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message as string
    })
    builder.addCase(fetchMemberCompaniesData.pending, (state, action) => {
      state.membershipData = []
      state.membershipError = ''
    })
    builder.addCase(
      fetchMemberCompaniesData.fulfilled,
      (state, { payload }) => {
        state.membershipData = payload as string[]
        state.membershipError = ''
      }
    )
    builder.addCase(fetchMemberCompaniesData.rejected, (state, action) => {
      state.membershipData = []
      state.membershipError = action.error.message as string
    })
  },
})

export const partnerNetworkSelector = (
  state: RootState
): PartnerNetworkInitialState => state.partnerNetwork

export default partnerNetworkSlice
