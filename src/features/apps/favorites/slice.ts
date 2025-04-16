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
import { type RootState } from 'features/store'
import { InitialListState, type ListState, RequestState } from 'types/MainTypes'
import { name } from './types'
import { apiSlice } from './apiSlice'

const initialState: ListState<string> = { ...InitialListState }

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.getItems.matchFulfilled,
      (state, { payload }) => {
        state.items = payload || []
        state.request = RequestState.OK
        state.error = ''
      }
    )
    builder.addMatcher(
      apiSlice.endpoints.getItems.matchRejected,
      (state, { error }) => {
        state.items = []
        state.request = RequestState.ERROR
        state.error = error.message ?? ''
      }
    )

    builder.addMatcher(
      apiSlice.endpoints.addItem.matchPending,
      (state, { meta }) => {
        state.change = meta.arg.originalArgs
        state.request = RequestState.SUBMIT
        state.error = ''
      }
    )
    builder.addMatcher(apiSlice.endpoints.addItem.matchFulfilled, (state) => {
      state.items.push(state.change!)
      state.change = null
      state.request = RequestState.OK
      state.error = ''
    })
    builder.addMatcher(
      apiSlice.endpoints.addItem.matchRejected,
      (state, { error }) => {
        state.change = null
        state.request = RequestState.ERROR
        state.error = error.message ?? ''
      }
    )

    builder.addMatcher(
      apiSlice.endpoints.removeItem.matchPending,
      (state, { meta }) => {
        state.change = meta.arg.originalArgs
        state.request = RequestState.SUBMIT
        state.error = ''
      }
    )
    builder.addMatcher(
      apiSlice.endpoints.removeItem.matchFulfilled,
      (state) => {
        state.items = state.items.filter((item) => item !== state.change)
        state.change = null
        state.request = RequestState.OK
        state.error = ''
      }
    )
    builder.addMatcher(
      apiSlice.endpoints.removeItem.matchRejected,
      (state, { error }) => {
        state.change = null
        state.request = RequestState.ERROR
        state.error = error.message ?? ''
      }
    )
  },
})

export const stateSelector = (state: RootState): ListState<string> =>
  state.apps.favorites
export const itemsSelector = (state: RootState): string[] =>
  state.apps.favorites.items

export default slice
