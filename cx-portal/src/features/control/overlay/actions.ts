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

import { createAction } from '@reduxjs/toolkit'
import { OVERLAYS } from 'types/Constants'
import { name } from './types'

const closeOverlay = createAction(`${name}/closeOverlay`, () => ({
  payload: {
    type: OVERLAYS.NONE,
    id: '',
  },
}))

const show = createAction(
  `${name}/show`,
  (type: OVERLAYS, id?: string, title?: string) => ({
    payload: {
      type,
      id,
      title,
    },
  })
)

const exec = createAction(`${name}/exec`, (id: string) => ({
  payload: {
    type: OVERLAYS.NONE,
    id,
  },
}))

export { closeOverlay, show, exec }
