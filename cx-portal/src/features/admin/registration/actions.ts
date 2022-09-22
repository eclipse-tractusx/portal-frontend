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
import { SearchParams } from '../../connector/types'

const fetchRegistrationRequests = createAsyncThunk(
  `${name}/fetchRegistrationRequests`,
  async ({ params }: { params: SearchParams }) => {
    try {
      return await Api.getInstance().getRegistrationRequests(params)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`${name}/fetchRegistrationRequests error`)
    }
  }
)

const fetchCompanyDetail = createAsyncThunk(
  `${name}/fetchCompanyDetail`,
  async (applicationId: string) => {
    try {
      return await Api.getInstance().getCompanyDetail(applicationId)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`${name}/fetchCompanyDetail error`)
    }
  }
)

const fetchPage = createAsyncThunk(
  `${name}/fetchPage`,
  async (page: number) => {
    try {
      return await Api.getInstance().getItems(page)
    } catch (error: unknown) {
      throw Error(`${name}/fetchPage error`)
    }
  }
)

const approveRequest = createAsyncThunk(
  `${name}/approveRequest`,
  async (applicationId: string) => {
    try {
      return await Api.getInstance().approveRegistrationRequest(applicationId)
    } catch (error: unknown) {
      throw Error(`${name}/approveRequest error`)
    }
  }
)

const declineRequest = createAsyncThunk(
  `${name}/declineRequest`,
  async (applicationId: string) => {
    try {
      return await Api.getInstance().declineRegistrationRequest(applicationId)
    } catch (error: unknown) {
      throw Error(`${name}/declineRequest error`)
    }
  }
)

export {
  fetchCompanyDetail,
  fetchRegistrationRequests,
  fetchPage,
  approveRequest,
  declineRequest,
}
