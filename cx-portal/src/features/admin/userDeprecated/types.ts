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

import { RequestState } from 'types/MainTypes'
import { TenantUser } from '../userApiSlice'

export const name = 'admin/user'

export type InviteData = {
  userName: string
  firstName: string
  lastName: string
  email: string
  organisationName: string
}

export type AddUser = {
  userName: string
  email: string
  firstName: string
  lastName: string
  roles?: string[]
  message: string
}

export type TechnicalUser = {
  userEntityId: string
  userName: string
  clientId: string
  authType: string
}

export interface AdminUserState {
  addOpen: boolean
  addTechnicalUserOpen: boolean
  tenantUsers: Array<TenantUser>
  usersToAdd: AddUser
  rolesToAdd: string[]
  addRequest: RequestState
  getRequest: RequestState
  error: string
}

export const InitialAddUser = {
  userName: '',
  email: '',
  firstName: '',
  lastName: '',
  roles: [],
  message: '',
}

export const initialState: AdminUserState = {
  tenantUsers: [],
  usersToAdd: InitialAddUser,
  rolesToAdd: [],
  getRequest: RequestState.NONE,
  addRequest: RequestState.NONE,
  addOpen: false,
  addTechnicalUserOpen: false,
  error: '',
}
