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
import { initialState, SearchInputState, name } from './types'
import { RootState } from 'features/store'

const managementSlice = createSlice({
  name,
  initialState,
  reducers: {
    setSearchOpen: (state, action) => ({
      ...state,
      open: action.payload.open,
      text: action.payload.text,
    }),
    increment: (state) => {
      state.currentActiveStep += 1
    },
    decrement: (state) => {
      state.currentActiveStep -= 1
    },
    setApplicationId: (state, action) => ({
      ...state,
      appId: action.payload,
    }),
  },
})

export const appManagementSelector = (state: RootState): SearchInputState =>
  state.management.searchInput

export const currentActiveStep = (state: RootState): any =>
  state.management.currentActiveStep

export const appIdSelector = (state: RootState): string =>
  state.management.appId

export const { increment, decrement } = managementSlice.actions

export default managementSlice
