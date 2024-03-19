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
import { type AdminUserState, name, initialState } from './types'
import { addTenantUsers, fetchTenantUsers } from './actions'
import type { RootState } from 'features/store'
import { RequestState } from 'types/MainTypes'
import type { TenantUser, AddUserIdp } from '../userApiSlice'

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
    builder.addCase(addTenantUsers.pending, (state) => ({
      ...state,
      addRequest: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(addTenantUsers.fulfilled, (state) => ({
      ...state,
      addRequest: RequestState.OK,
      error: '',
    }))
    builder.addCase(addTenantUsers.rejected, (state, action) => ({
      ...state,
      addRequest: RequestState.ERROR,
      error: action.error.message!,
    }))
    builder.addCase(fetchTenantUsers.pending, (state) => ({
      ...state,
      tenantUsers: [],
      getRequest: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchTenantUsers.fulfilled, (state, { payload }) => ({
      ...state,
      tenantUsers: payload.content || [],
      getRequest: RequestState.OK,
      error: '',
    }))
    builder.addCase(fetchTenantUsers.rejected, (state, action) => ({
      ...state,
      tenantUsers: [],
      getRequest: RequestState.ERROR,
      error: action.error.message!,
    }))
  },
})

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
