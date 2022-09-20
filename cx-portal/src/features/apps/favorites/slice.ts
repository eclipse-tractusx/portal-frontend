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
import { addItem, fetchItems, removeItem } from './actions'
import { InitialListState, ListState, RequestState } from 'types/MainTypes'
import { name } from './types'

const initialState: ListState<string> = { ...InitialListState }

const pendingCase = (state: ListState<string>, action: any) => ({
  ...state,
  change: action.meta.arg || null,
  request: RequestState.SUBMIT,
  error: '',
})

const rejectedCase = (state: ListState<string>, action: any) => ({
  ...state,
  change: null,
  request: RequestState.ERROR,
  error: action.error.message as string,
})

export const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch
    builder.addCase(fetchItems.pending, (state) => ({
      ...state,
      items: [],
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchItems.fulfilled, (state, { payload }) => ({
      ...state,
      items: payload || [],
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(fetchItems.rejected, (state, action) => ({
      ...state,
      items: [],
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))

    //add
    builder.addCase(addItem.pending, pendingCase)
    builder.addCase(addItem.fulfilled, (state) => ({
      items: [...state.items, state.change!],
      change: null,
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(addItem.rejected, rejectedCase)

    //remove
    builder.addCase(removeItem.pending, pendingCase)
    builder.addCase(removeItem.fulfilled, (state) => ({
      items: state.items.filter((a) => a !== state.change),
      change: null,
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(removeItem.rejected, rejectedCase)
  },
})

export const stateSelector = (state: RootState): ListState<string> =>
  state.apps.favorites

export const itemsSelector = (state: RootState): string[] =>
  state.apps.favorites.items

const Slice = { slice }

export default Slice
