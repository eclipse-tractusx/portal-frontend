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

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'features/store'
import type { IUser } from './types'

const initialState: IUser = {
  userName: '',
  name: '',
  email: '',
  company: '',
  tenant: '',
  access: {},
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedUser: (_state: IUser, action: PayloadAction<IUser>) => {
      return action.payload
    },
  },
})

export const { setLoggedUser } = userSlice.actions
export const userSelector = (state: RootState): IUser => state.user

export default userSlice.reducer
