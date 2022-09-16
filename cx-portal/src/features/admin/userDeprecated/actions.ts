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

import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import { AddUser, name } from './types'

const openAdd = createAction(`${name}/openAdd`)
const closeAdd = createAction(`${name}/closeAdd`)
const setUsersToAdd = createAction<AddUser | {}>(`${name}/setUsersToAdd`)
const setRolesToAdd = createAction<string[]>(`${name}/setRolesToAdd`)

const addTenantUsers = createAsyncThunk(
  `${name}/add`,
  async (users: AddUser[]) => {
    try {
      return await Api.getInstance().addTenantUsers(users)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`${name}/add error`)
    }
  }
)

const fetchTenantUsers = createAsyncThunk(`${name}/fetch`, async () => {
  try {
    return await Api.getInstance().getTenantUsers()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${name}/fetch error`)
  }
})

export {
  openAdd,
  closeAdd,
  setUsersToAdd,
  setRolesToAdd,
  addTenantUsers,
  fetchTenantUsers,
}
