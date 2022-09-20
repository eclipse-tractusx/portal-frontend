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

import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import { name } from './types'

const fetchItems = createAsyncThunk(`${name}/fetch`, async () => {
  try {
    return await Api.getInstance().getItems()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${name}/fetch api call error`)
  }
})

const addItem = createAsyncThunk(`${name}/add`, async (id: string) => {
  try {
    return await Api.getInstance().putItem(id)
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${name}/add api call error`)
  }
})

const removeItem = createAsyncThunk(`${name}/remove`, async (id: string) => {
  try {
    return await Api.getInstance().deleteItem(id)
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${name}/remove api call error`)
  }
})

export { fetchItems, addItem, removeItem }
