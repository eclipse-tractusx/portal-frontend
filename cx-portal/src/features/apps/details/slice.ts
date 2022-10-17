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
import { RootState } from 'features/store'
import { fetch } from './actions'
import {
  AppDetailInitial,
  AppDetails,
  AppDetailsState,
  initialState,
  name,
} from './types'

export const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetch.pending, (state) => {
      state.item = AppDetailInitial
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetch.fulfilled, (state, { payload }) => {
      state.item = payload || {}
      state.loading = false
      state.error = ''
    })
    builder.addCase(fetch.rejected, (state, action) => {
      state.item = AppDetailInitial
      state.loading = false
      state.error = action.error.message as string
    })
  },
})

export const stateSelector = (state: RootState): AppDetailsState =>
  state.apps.details

export const itemSelector = (state: RootState): AppDetails =>
  state.apps.details.item

const Slice = { slice }

export default Slice
