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

import { createAction, createSlice } from '@reduxjs/toolkit'
import { OVERLAYS } from 'types/Constants'
import type { RootState } from 'features/store'

export const name = 'control/overlay'

export type OverlayState = {
  type: OVERLAYS
  id: string
  title?: string
  status?: boolean
  subTitle?: string
  roles?: string[]
  link?: string
}

const initialState = {
  type: OVERLAYS.NONE,
  id: '',
  title: '',
  displayName: '',
  subTitle: '',
  roles: [],
}

const closeOverlay = createAction(`${name}/closeOverlay`, () => ({
  payload: {
    type: OVERLAYS.NONE,
    id: '',
  },
}))

const show = createAction(
  `${name}/show`,
  (
    type: OVERLAYS,
    id?: string,
    title?: string,
    status?: boolean,
    subTitle?: string,
    roles?: string[],
    link?: string
  ) => ({
    payload: {
      type,
      id,
      title,
      status,
      subTitle,
      roles,
      link,
    },
  })
)

const exec = createAction(`${name}/exec`, (id: string) => ({
  payload: {
    type: OVERLAYS.NONE,
    id,
  },
}))

// Add an ESLint exception until there is a solution
// eslint-disable-next-line
const forward = (_state: any, action: any) => ({
  ...action.payload,
})

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    exec: forward,
    show: forward,
    closeOverlay: forward,
  },
})

export const stateSelector = (state: RootState): OverlayState =>
  state.control.overlay

export { closeOverlay, show, exec }

export default slice.reducer
