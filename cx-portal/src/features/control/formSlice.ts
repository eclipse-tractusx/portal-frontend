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
import { RootState } from 'features/store'
import { IHashMap } from 'types/MainTypes'

const name = 'control/form'

export enum FORMS {
  GENERIC = 'GENERIC',
  IDP_FORM = 'IDP_FORM',
  IDP_USER_FORM = 'IDP_USER_FORM',
  IDP_USER_RESPONSE_FORM = 'IDP_USER_RESPONSE_FORM',
}

interface FormAttribute {
  [name: string]: string | boolean
}

export type StoreFormType = {
  form: FORMS
  att: FormAttribute
}

const initialState: IHashMap<any> = {}
initialState[FORMS.GENERIC] = {}
initialState[FORMS.IDP_FORM] = {}
initialState[FORMS.IDP_USER_FORM] = {}
initialState[FORMS.IDP_USER_RESPONSE_FORM] = {}

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    storeForm: (state, action: PayloadAction<StoreFormType>) => {
      state[action.payload.form] = {
        ...state[action.payload.form],
        ...action.payload.att,
      }
    },
  },
})

export const { storeForm } = slice.actions

export const genericSelector = (state: RootState): any =>
  state.control.form[FORMS.GENERIC]

export const editIDPSelector = (state: RootState): any =>
  state.control.form[FORMS.IDP_FORM]

export const editIDPUserSelector = (state: RootState): any =>
  state.control.form[FORMS.IDP_USER_FORM]

export const editIDPUserResponseSelector = (state: RootState): any =>
  state.control.form[FORMS.IDP_USER_RESPONSE_FORM]

export default slice.reducer
