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

import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { initErrorServiceState } from 'types/MainTypes'
import { ErrorServiceState, initialState, name } from './types'

export const ErrorSlice = createSlice({
  name,
  initialState,
  reducers: {
    setError: (state, { payload }) => ({
      ...state,
      hasError: payload.hasError,
      hasNavigation: payload.hasNavigation,
      header: payload.header,
      title: payload.title,
      description: payload.description,
      reloadPageLink: payload.reloadPageLink,
      reloadButtonTitle: payload.reloadButtonTitle,
      homePageLink: payload.homePageLink,
      homeButtonTitle: payload.homeButtonTitle,
    }),
    resetError: (state) => ({
      ...state,
      hasError: initErrorServiceState.hasError,
      hasNavigation: initErrorServiceState.hasNavigation,
      header: initErrorServiceState.header,
      title: initErrorServiceState.title,
      description: initErrorServiceState.description,
      reloadPageLink: initErrorServiceState.reloadPageLink,
      reloadButtonTitle: initErrorServiceState.reloadButtonTitle,
      homePageLink: initErrorServiceState.homePageLink,
      homeButtonTitle: initErrorServiceState.homeButtonTitle,
    }),
  },
})

export const errorSelector = (state: RootState): ErrorServiceState =>
  state.error

export default ErrorSlice
