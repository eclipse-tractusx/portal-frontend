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
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'features/store'
import type { IHashMap } from 'types/MainTypes'
import type { SearchInputState } from 'features/appManagement/types'

const name = 'control/update'

export enum UPDATES {
  USER_LIST = 'USER_LIST',
  TECHUSER_LIST = 'TECHUSER_LIST',
  APPS_ACTIVE_LIST = 'APPS_ACTIVE_LIST',
  APPS_FAVORITE_LIST = 'APPS_FAVORITE_LIST',
  APPS_SUBSCRIBED_LIST = 'APPS_SUBSCRIBED_LIST',
  INVITE_LIST = 'INVITE_LIST',
}

export type UpdatesState = IHashMap<number>

const initialState: UpdatesState = {}
Object.keys(UPDATES).forEach((key) => (initialState[key] = 0))

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    updateData: (state, action: PayloadAction<string>) => {
      state[action.payload]++
    },
  },
})

export const { updateData } = slice.actions

export const updateUserSelector = (state: RootState): number =>
  state.control.update[UPDATES.USER_LIST]

export const updateTechuserSelector = (state: RootState): number =>
  state.control.update[UPDATES.TECHUSER_LIST]

export const updateActiveAppsSelector = (state: RootState): number =>
  state.control.update[UPDATES.APPS_ACTIVE_LIST]

export const updateFavoriteAppsSelector = (state: RootState): number =>
  state.control.update[UPDATES.APPS_FAVORITE_LIST]

export const updateSubscribedAppsSelector = (state: RootState): number =>
  state.control.update[UPDATES.APPS_SUBSCRIBED_LIST]

export const updateInviteSelector = (state: RootState): SearchInputState =>
  state.management

export const updateApplicationRequestSelector = (
  state: RootState
): SearchInputState => state.management

export const updatePartnerSelector = (state: RootState): SearchInputState =>
  state.management

export default slice.reducer
