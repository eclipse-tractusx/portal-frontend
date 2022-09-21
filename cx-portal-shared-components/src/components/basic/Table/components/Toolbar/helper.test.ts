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

import { describe, expect, it } from '@jest/globals'
import { SelectedFilter, ToolbarProps } from '.'
import { initSelectedFilter, getSelectedFilterUpdate } from './helper'

const filter: ToolbarProps['filter'] = [
  {
    name: 'role',
    values: [
      { value: 'admin', label: 'Admin' },
      { value: 'editor', label: 'Editor' },
    ],
  },
  {
    name: 'status',
    values: [{ value: 'confirmed' }],
  },
]

const selected: SelectedFilter = {
  role: ['admin', 'editor'],
  status: ['confirmed'],
}

describe('TableToolbarTest', () => {
  it('converts Filter input into initial SelectedFilter object', () => {
    expect(initSelectedFilter(filter)).toEqual({
      role: ['admin', 'editor'],
      status: ['confirmed'],
    })

    expect(initSelectedFilter(undefined)).toEqual({})
  })

  it('removes values from SelectedFilter object', () => {
    expect(getSelectedFilterUpdate(selected, 'role', 'admin', false)).toEqual({
      role: ['editor'],
      status: ['confirmed'],
    })
  })

  it('adds values to SelectedFilter object', () => {
    expect(getSelectedFilterUpdate(selected, 'role', 'manager', true)).toEqual({
      role: ['admin', 'editor', 'manager'],
      status: ['confirmed'],
    })
  })
})
