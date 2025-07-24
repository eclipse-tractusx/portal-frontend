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
import type { RootState } from 'features/store'

const name = 'admin/adminBoard'

export enum AdminActionType {
  NONE = 'none',
  APPROVE = 'approve',
  DECLINE = 'decline',
}

export interface AdminBoardState {
  isSuccess: boolean
  isError: boolean
  lastActionType: AdminActionType
}

export const initialState: AdminBoardState = {
  isSuccess: false,
  isError: false,
  lastActionType: AdminActionType.NONE,
}

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setSuccessType: (state, action) => {
      state.isSuccess = action.payload
    },
    setErrorType: (state, action) => {
      state.isError = action.payload
    },
    setActionType: (state, action) => {
      state.lastActionType = action.payload
    },
    resetState: (state) => {
      state.isSuccess = false
      state.isError = false
      state.lastActionType = AdminActionType.NONE
    },
  },
})

export const currentSuccessType = (state: RootState): boolean =>
  state.adminBoard.isSuccess

export const currentErrorType = (state: RootState): boolean =>
  state.adminBoard.isError

export const currentActionType = (state: RootState): AdminActionType =>
  state.adminBoard.lastActionType

export const { setSuccessType, setErrorType, setActionType, resetState } =
  slice.actions
export default slice
