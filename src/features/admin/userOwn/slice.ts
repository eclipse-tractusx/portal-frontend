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
import {
  name,
  initialState,
  type AdminUserDetailState,
  type UserDetail,
  InitialUserDetail,
} from './types'
import {
  deleteUserBpn,
  fetchAny,
  fetchOwn,
  putBusinessPartnerNumber,
} from './actions'
import type { RootState } from 'features/store'
import { RequestState } from 'types/MainTypes'

const pending = (state: AdminUserDetailState) => ({
  ...state,
  data: InitialUserDetail,
  request: RequestState.SUBMIT,
  error: '',
})

const fulfilled = (
  state: AdminUserDetailState,
  { payload }: { payload: UserDetail }
) => ({
  ...state,
  data: payload || [],
  request: RequestState.OK,
  error: '',
})

// Add an ESLint exception until there is a solution
// eslint-disable-next-line
const rejected = (state: AdminUserDetailState, action: { error: any }) => ({
  ...state,
  data: InitialUserDetail,
  request: RequestState.ERROR,
  error: action.error.message as string,
})

export const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOwn.pending, pending)
    builder.addCase(fetchOwn.fulfilled, fulfilled)
    builder.addCase(fetchOwn.rejected, rejected)

    builder.addCase(fetchAny.pending, pending)
    builder.addCase(fetchAny.fulfilled, fulfilled)
    builder.addCase(fetchAny.rejected, rejected)

    builder.addCase(putBusinessPartnerNumber.pending, (state) => ({
      ...state,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(putBusinessPartnerNumber.fulfilled, (state, action) => ({
      ...state,
      data: {
        ...state.data,
        bpn: [...state.data.bpn, action.meta.arg.inputBPN],
      },
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(putBusinessPartnerNumber.rejected, (state, action) => ({
      ...state,
      request: RequestState.ERROR,
      error: action.error.message!,
    }))
    builder.addCase(deleteUserBpn.fulfilled, (state, action) => {
      state.request = RequestState.OK
      state.data = {
        ...state.data,
        bpn: state.data.bpn.filter((item) => item !== action.meta.arg.bpn),
      }
    })
  },
})

export const UserdetailSelector = (state: RootState): UserDetail =>
  state.admin.userOwn.data

// Add an ESLint exception until there is a solution
// eslint-disable-next-line
export const resetSelector = (state: RootState): any => state.admin.userOwn

const Slice = { slice }

export default Slice
