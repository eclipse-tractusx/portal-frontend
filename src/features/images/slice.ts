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

import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'features/store'

const name = 'images'

export type ImagesState = Record<string, ArrayBuffer>

const initialState: ImagesState = {}

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    put: (state, action: PayloadAction<ImagesState>) => ({
      ...state,
      ...action.payload,
    }),
    delete: (state, action: PayloadAction<string>) => {
      const copy = { ...state }
      // Redux doesn't support Map type so we have to go with a generic Record
      // eslint-disable-next-line
      delete copy[action.payload]
      return copy
    },
  },
})

export const { put } = slice.actions

export const imagesSelector = (state: RootState): ImagesState => state.images

export default slice.reducer
