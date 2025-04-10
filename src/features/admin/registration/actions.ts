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

import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { Api } from './api'
import { name } from './types'
import type { SearchParams } from '../../connector/types'
import { error, type LogData } from 'services/LogService'

const fetchRegistrationRequests = createAsyncThunk(
  `${name}/fetchRegistrationRequests`,
  async ({ params }: { params: SearchParams }) => {
    try {
      await Api.getInstance().getRegistrationRequests(params)
    } catch (e: unknown) {
      error('api call error:', e as LogData)
      throw Error(`${name}/fetchRegistrationRequests error`)
    }
  }
)

const fetchCompanyDetail = createAsyncThunk(
  `${name}/fetchCompanyDetail`,
  async (applicationId: string) => {
    try {
      return await Api.getInstance().getCompanyDetail(applicationId)
    } catch (e: unknown) {
      error('api call error:', e as LogData)
      throw Error(`${name}/fetchCompanyDetail error`)
    }
  }
)

const fetchPage = createAsyncThunk(
  `${name}/fetchPage`,
  async (page: number) => {
    try {
      return await Api.getInstance().getItems(page)
    } catch (e: unknown) {
      error('api call error:', e as LogData)
      throw Error(`${name}/fetchPage error`)
    }
  }
)

const refreshApplicationRequest = createAction(
  `${name}/refreshApplicationRequest`,
  (refresh: number) => ({ payload: { refresh } })
)

export {
  fetchCompanyDetail,
  fetchRegistrationRequests,
  fetchPage,
  refreshApplicationRequest,
}
