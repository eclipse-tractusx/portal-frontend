/********************************************************************************
 * Copyright (c) 2021, 2023 T-Systems International GmbH and BMW Group AG
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

import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import type { FilterParams } from './types'

const fetchDigitalTwins = createAsyncThunk(
  'fetch twins',
  async ({ filter }: { filter: FilterParams }) => {
    try {
      return await Api.getInstance().getTwins(filter)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('DigitalTwin api call error')
    }
  }
)
const fetchTwinById = createAsyncThunk(
  'fetch twin by id',
  async (id: string) => {
    try {
      return await Api.getInstance().getTwinById(id)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('Get twin by id api call error')
    }
  }
)

const fetchTwinForSearch = createAsyncThunk(
  'fetch twin for search',
  async ({ key, value }: { key: string; value: string }) => {
    try {
      const response = await Api.getInstance().getTwinForSearch(
        encodeURIComponent(JSON.stringify([{ key, value }]))
      )

      const mappedData = await Promise.all([
        ...response.map((id: string) => Api.getInstance().getTwinById(id)),
      ])

      return mappedData
    } catch (error) {
      console.error('api call error:', error)
      throw Error('Get twin by id for search api call error')
    }
  }
)

export { fetchDigitalTwins, fetchTwinById, fetchTwinForSearch }
