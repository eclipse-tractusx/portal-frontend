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
import { apiSlice } from './apiSlice'
import {
  name,
  initialState,
  type AdminUserDetailState,
  InitialUserDetail,
  type UserDetail,
  type PutBpnArgs,
  type DeleteBpnArgs,
} from './types'
import { RequestState } from 'types/MainTypes'
import type { RootState } from 'features/store'

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
    builder.addMatcher(apiSlice.endpoints.fetchOwn.matchPending, pending)
    builder.addMatcher(apiSlice.endpoints.fetchOwn.matchFulfilled, fulfilled)
    builder.addMatcher(apiSlice.endpoints.fetchOwn.matchRejected, rejected)

    builder.addMatcher(apiSlice.endpoints.fetchAny.matchPending, pending)
    builder.addMatcher(apiSlice.endpoints.fetchAny.matchFulfilled, fulfilled)
    builder.addMatcher(apiSlice.endpoints.fetchAny.matchRejected, rejected)

    builder.addMatcher(
      apiSlice.endpoints.putBusinessPartnerNumber.matchPending,
      (state) => ({
        ...state,
        request: RequestState.SUBMIT,
        error: '',
      })
    )
    builder.addMatcher(
      apiSlice.endpoints.putBusinessPartnerNumber.matchFulfilled,
      (state, action) => {
        const { inputBPN }: PutBpnArgs = action.meta.arg.originalArgs

        return {
          ...state,
          data: {
            ...state.data,
            bpn: [...state.data.bpn, inputBPN],
          },
          request: RequestState.OK,
          error: '',
        }
      }
    )
    builder.addMatcher(
      apiSlice.endpoints.putBusinessPartnerNumber.matchRejected,
      (state, action) => ({
        ...state,
        request: RequestState.ERROR,
        error: action.error.message!,
      })
    )

    builder.addMatcher(
      apiSlice.endpoints.deleteUserBpn.matchFulfilled,
      (state, action) => {
        const { bpn }: DeleteBpnArgs = action.meta.arg.originalArgs
        state.request = RequestState.OK
        state.data.bpn = state.data.bpn.filter((item) => item !== bpn)
      }
    )
  },
})

export const UserdetailSelector = (state: RootState): UserDetail =>
  state.admin.userOwn.data
export const resetSelector = (state: RootState): AdminUserDetailState =>
  state.admin.userOwn

const Slice = { slice }

export default Slice
