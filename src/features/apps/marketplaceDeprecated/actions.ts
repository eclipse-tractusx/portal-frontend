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

import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import { name } from './types'

const fetchActive = createAsyncThunk(`${name}/active/fetch`, async () => {
  try {
    return await Api.getInstance().getActive()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${name}/active/fetch error`)
  }
})

const fetchLatest = createAsyncThunk(`${name}/latest/fetch`, async () => {
  try {
    return await Api.getInstance().getLatest()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${name}/latest/fetch error`)
  }
})

const fetchSubscriptionStatus = createAsyncThunk(
  `${name}/subscribed/subscription-status`,
  async () => {
    try {
      return await Api.getInstance().getSubscriptionStatus()
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`${name}/subscribed/subscription-status error`)
    }
  }
)

export { fetchActive, fetchLatest, fetchSubscriptionStatus }
