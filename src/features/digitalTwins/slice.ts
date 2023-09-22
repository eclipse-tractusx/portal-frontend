/********************************************************************************
 * Copyright (c) 2021, 2023 T-Systems International GmbH and BMW Group AG
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
import type { RootState } from 'features/store'
import { fetchDigitalTwins, fetchTwinById, fetchTwinForSearch } from './actions'
import type {
  DigitalTwinsInitialState,
  ShellDescriptor,
  TwinList,
} from './types'

const defaultTwins: TwinList = {
  items: [],
  totalItems: 0,
  itemCount: 0,
  currentPage: 0,
  totalPages: 0,
}

const initialState: DigitalTwinsInitialState = {
  twinList: defaultTwins,
  twin: null,
  loading: false,
  error: '',
}

const twinsSlice = createSlice({
  name: 'twins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDigitalTwins.pending, (state) => {
      state.twinList = defaultTwins
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchDigitalTwins.fulfilled, (state, { payload }) => {
      state.twinList = payload as TwinList
      state.loading = false
      state.error = ''
    })
    builder.addCase(fetchDigitalTwins.rejected, (state, action) => {
      state.twinList = defaultTwins
      state.loading = false
      state.error = action.error.message as string
    })

    builder.addCase(fetchTwinById.pending, (state) => {
      state.twin = null
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchTwinById.fulfilled, (state, { payload }) => {
      state.twin = payload as ShellDescriptor
      state.loading = false
      state.error = ''
    })
    builder.addCase(fetchTwinById.rejected, (state, action) => {
      state.twin = null
      state.loading = false
      state.error = action.error.message as string
    })

    builder.addCase(fetchTwinForSearch.pending, (state, { payload }) => {
      state.twinList = defaultTwins
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchTwinForSearch.fulfilled, (state, { payload }) => {
      state.twinList = { ...state.twinList, currentPage: 0, items: payload }
      state.error = ''
      state.loading = false
    })
    builder.addCase(fetchTwinForSearch.rejected, (state, action) => {
      state.twinList = { ...state.twinList, items: [] }
      state.loading = false
      state.error = action.error.message as string
    })
  },
})

export const twinsSelector = (state: RootState): DigitalTwinsInitialState =>
  state.twins

export default twinsSlice
