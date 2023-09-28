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

const name = 'apps/updateCompanyRoles'

export interface UpdateCompanyRoleState {
  isSuccess: boolean
  isError: boolean
  isCancel: boolean
}

export const initialState: UpdateCompanyRoleState = {
  isSuccess: false,
  isError: false,
  isCancel: false,
}

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setCompanyRoleSuccess: (state, action) => {
      state.isSuccess = action.payload
    },
    setCompanyRoleError: (state, action) => {
      state.isError = action.payload
    },
    setOverlayCancel: (state, action) => {
      state.isCancel = action.payload
    },
  },
})

export const updateRoleSuccessType = (state: RootState): any =>
  state.companyRoles.isSuccess

export const updateRoleErrorType = (state: RootState): any =>
  state.companyRoles.isError

export const cancelOverlayType = (state: RootState): any =>
  state.companyRoles.isCancel

export const { setCompanyRoleSuccess, setCompanyRoleError, setOverlayCancel } =
  slice.actions
export default slice
