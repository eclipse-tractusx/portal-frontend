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

import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { GridRowId } from '@mui/x-data-grid'
import { Api } from './api'
import { type AddUser, name } from './types'
import type { IHashMap } from 'types/MainTypes'
import { error, type LogData } from 'services/LogService'

const openAdd = createAction(`${name}/openAdd`)
const closeAdd = createAction(`${name}/closeAdd`)
const setUsersToAdd = createAction<IHashMap<string>>(`${name}/setUsersToAdd`)
const setRolesToAdd = createAction<string[]>(`${name}/setRolesToAdd`)
const setSelectedUserToAdd = createAction<GridRowId[]>(
  `${name}/setSelectedUserToAdd`
)

const addTenantUsers = createAsyncThunk(
  `${name}/add`,
  async (users: AddUser[]) => {
    try {
      return await Api.getInstance().addTenantUsers(users)
    } catch (e: unknown) {
      error('api call error:', e as LogData)
      throw Error(`${name}/add error`)
    }
  }
)

const fetchTenantUsers = createAsyncThunk(`${name}/fetch`, async () => {
  try {
    return await Api.getInstance().getTenantUsers()
  } catch (e: unknown) {
    error('api call error:', e as LogData)
    throw Error(`${name}/fetch error`)
  }
})

export {
  openAdd,
  closeAdd,
  setUsersToAdd,
  setRolesToAdd,
  setSelectedUserToAdd,
  addTenantUsers,
  fetchTenantUsers,
}
