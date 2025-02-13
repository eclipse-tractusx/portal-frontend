/********************************************************************************
 * Copyright (c) 2023 T-Systems International GmbH and BMW Group AG
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
import { apiSlice } from './apiSlice'
import type { SemanticModel } from './types'

const initialState = {
  model: null as SemanticModel | null,
  uploadedModel: null as SemanticModel | null,
  uploading: false,
  uploadError: '',
  loadingModel: false,
  openApiLink: '',
  openApiError: '',
  error: '',
}

const semanticModelsSlice = createSlice({
  name: 'semanticModels',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = ''
      state.openApiError = ''
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.getModelById.matchPending,
      (state) => {
        state.loadingModel = true
        state.error = ''
      }
    )
    builder.addMatcher(
      apiSlice.endpoints.getModelById.matchFulfilled,
      (state, { payload }) => {
        state.model = payload
        state.loadingModel = false
        state.error = ''
      }
    )
    builder.addMatcher(
      apiSlice.endpoints.getModelById.matchRejected,
      (state, action) => {
        state.loadingModel = false
        state.error = action.error.message!
      }
    )

    builder.addMatcher(
      apiSlice.endpoints.changeOpenApiUrl.matchFulfilled,
      (state, action) => {
        state.openApiLink = URL.createObjectURL(action.payload)
        state.openApiError = ''
      }
    )
    builder.addMatcher(
      apiSlice.endpoints.changeOpenApiUrl.matchRejected,
      (state, action) => {
        state.openApiLink = ''
        state.openApiError = action.error.message!
      }
    )
    builder.addMatcher(
      apiSlice.endpoints.postSemanticModel.matchPending,
      (state) => {
        state.uploading = true
        state.uploadError = ''
      }
    )
    builder.addMatcher(
      apiSlice.endpoints.postSemanticModel.matchFulfilled,
      (state, { payload }) => {
        state.uploading = false
        state.uploadedModel = payload
        state.uploadError = ''
      }
    )
    builder.addMatcher(
      apiSlice.endpoints.postSemanticModel.matchRejected,
      (state, { error }) => {
        state.uploading = false
        state.uploadError = error.message!
      }
    )
  },
})

export const { resetError } = semanticModelsSlice.actions

export const semanticModelsSelector = (state: RootState) => state.semanticModels

export default semanticModelsSlice
