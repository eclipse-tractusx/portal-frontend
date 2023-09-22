/********************************************************************************
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

const name = 'control/appear'

export enum AppearItem {
  SEARCH = 'SEARCH',
}

const initialState: Record<AppearItem, boolean> = {
  SEARCH: false,
}

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    setAppear: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
})

export const { setAppear } = slice.actions

export const appearSearchSelector = (state: RootState): boolean =>
  state.control.appear.SEARCH

export default slice.reducer
