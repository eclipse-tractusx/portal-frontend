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
import type { CardItems } from '@arena2036/portal-shared-components-construct-x'
import { type RootState } from 'features/store'
import { RequestState } from 'types/MainTypes'
import { apiSlice } from './apiSlice'
import { initialState, name } from './types'

export const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(apiSlice.endpoints.getItems.matchPending, (state) => {
        state.items = []
        state.request = RequestState.SUBMIT
        state.error = ''
      })
      .addMatcher(
        apiSlice.endpoints.getItems.matchFulfilled,
        (state, { payload }) => {
          state.items = payload ?? []
          state.request = RequestState.OK
          state.error = ''
        }
      )
      .addMatcher(
        apiSlice.endpoints.getItems.matchRejected,
        (state, { error }) => {
          state.items = []
          state.request = RequestState.ERROR
          state.error = error.message ?? ''
        }
      )
  },
})

export const itemsSelector = (state: RootState): CardItems[] =>
  state.info.news.items

export const Slice = { slice }

export default Slice
