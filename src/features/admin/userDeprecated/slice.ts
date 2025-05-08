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
import { type AdminUserState, name, initialState } from './types'
import { RequestState } from 'types/MainTypes'
import { type RootState } from 'features/store'
import type { TenantUser, AddUserIdp } from '../userApiSlice'
import { apiSlice } from './apiSlice'

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    openAdd: (state) => ({
      ...state,
      addOpen: true,
      addRequest: RequestState.NONE,
    }),
    closeAdd: (state) => ({
      ...state,
      addOpen: false,
    }),
    setUsersToAdd: (state, action) => ({
      ...state,
      usersToAdd: { ...state.usersToAdd, ...action.payload },
    }),
    setRolesToAdd: (state, action) => ({
      ...state,
      rolesToAdd: [...action.payload],
    }),
    setSelectedUserToAdd: (state, action) => ({
      ...state,
      selectedUser: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(apiSlice.endpoints.addTenantUsers.matchPending, (state) => ({
        ...state,
        addRequest: RequestState.SUBMIT,
        error: '',
      }))
      .addMatcher(
        apiSlice.endpoints.addTenantUsers.matchFulfilled,
        (state) => ({
          ...state,
          addRequest: RequestState.OK,
          error: '',
        })
      )
      .addMatcher(
        apiSlice.endpoints.addTenantUsers.matchRejected,
        (state, action) => ({
          ...state,
          addRequest: RequestState.ERROR,
          error: action.error.message!,
        })
      )
      .addMatcher(apiSlice.endpoints.getTenantUsers.matchPending, (state) => ({
        ...state,
        tenantUsers: [],
        getRequest: RequestState.SUBMIT,
        error: '',
      }))
      .addMatcher(
        apiSlice.endpoints.getTenantUsers.matchFulfilled,
        (state, { payload }) => ({
          ...state,
          tenantUsers: payload.content ?? [],
          getRequest: RequestState.OK,
          error: '',
        })
      )
      .addMatcher(
        apiSlice.endpoints.getTenantUsers.matchRejected,
        (state, action) => ({
          ...state,
          tenantUsers: [],
          getRequest: RequestState.ERROR,
          error: action.error.message!,
        })
      )
  },
})

export const { setRolesToAdd, setSelectedUserToAdd, setUsersToAdd } =
  slice.actions
export const stateSelector = (state: RootState): AdminUserState =>
  state.admin.user
export const addOpenSelector = (state: RootState): boolean =>
  state.admin.user.addOpen
export const tenantUsersSelector = (state: RootState): TenantUser[] =>
  state.admin.user.tenantUsers
export const usersToAddSelector = (state: RootState): AddUserIdp =>
  state.admin.user.usersToAdd
export const rolesToAddSelector = (state: RootState): string[] =>
  state.admin.user.rolesToAdd
export const selectedUserSelector = (state: RootState): string[] =>
  state.admin.user.selectedUser
export const getRequestStateSelector = (state: RootState): RequestState =>
  state.admin.user.getRequest
export const addRequestStateSelector = (state: RootState): RequestState =>
  state.admin.user.addRequest

const Slice = { slice }

export default Slice
