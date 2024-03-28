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
import type { RootState } from 'features/store'
import { RequestState } from 'types/MainTypes'
import { fetchSearch } from './actions'
import { initialState, name, type SearchItem } from './types'

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    clear: (state) => ({
      ...state,
      expr: '',
      items: [],
      request: RequestState.NONE,
      error: '',
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state, action) => ({
      ...state,
      expr: action.meta.arg,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchSearch.fulfilled, (state, { payload }) => ({
      ...state,
      items: payload || [],
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(fetchSearch.rejected, (state, action) => ({
      ...state,
      items: [],
      request: RequestState.ERROR,
      error: action.error.message!,
    }))
  },
})

export const searchExprSelector = (state: RootState): string =>
  state.info.search.expr

export const searchItemSelector = (state: RootState): SearchItem[] =>
  state.info.search.items

const Slice = { slice }

export default Slice
