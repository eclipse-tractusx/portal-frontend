/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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

import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'features/store'
import { initialState, name, type ServiceStatusDataState } from './types'

const serviceManagementSlice = createSlice({
  name,
  initialState,
  reducers: {
    serviceReleaseStepIncrement: (state) => {
      state.serviceReleaseActiveStep += 1
    },
    serviceReleaseStepDecrement: (state) => {
      state.serviceReleaseActiveStep -= 1
    },
    setServiceReleaseActiveStep: (state) => {
      state.serviceReleaseActiveStep = 1
    },
    setServiceStatus: (state, action) => ({
      ...state,
      serviceStatusData: action.payload,
    }),
    setServiceId: (state, action) => ({
      ...state,
      serviceId: action.payload,
    }),
    setServiceRedirectStatus: (state, action) => ({
      ...state,
      serviceRedirectStatus: action.payload,
    }),
  },
})

export const serviceReleaseActiveStep = (state: RootState): number =>
  state.serviceManagement.serviceReleaseActiveStep

export const serviceIdSelector = (state: RootState): string =>
  state.serviceManagement.serviceId

export const serviceRedirectStatusSelector = (state: RootState): boolean =>
  state.serviceManagement.serviceRedirectStatus

export const serviceStatusDataSelector = (
  state: RootState
): ServiceStatusDataState => state.serviceManagement.serviceStatusData

export const {
  serviceReleaseStepIncrement,
  serviceReleaseStepDecrement,
  setServiceReleaseActiveStep,
  setServiceId,
  setServiceRedirectStatus,
} = serviceManagementSlice.actions

export default serviceManagementSlice
