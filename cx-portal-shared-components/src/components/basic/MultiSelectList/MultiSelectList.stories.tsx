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

import { ComponentStory } from '@storybook/react'

import { MultiSelectList as Component } from '.'

export default {
  title: 'Form',
  component: Component,
  argTypes: {},
}

const items: any[] = [
  {
    id: 1,
    title: 'Dismantler App',
    value: 'App1',
  },
  {
    id: 2,
    title: 'Application name',
    value: 'App2',
  },
  {
    id: 3,
    title: 'Title Application',
    value: 'App3',
  },
  {
    id: 4,
    title: 'CX Design lunched',
    value: 'App4',
  },
  {
    id: 5,
    title: 'Fleet Manager',
    value: 'App5',
  },
  {
    id: 6,
    title: 'Fraud Daschboard',
    value: 'App6',
  },
  {
    id: 7,
    title: 'App Manage Customers',
    value: 'App7',
  },
  {
    id: 8,
    title: 'Smart Application',
    value: 'App8',
  },
  {
    id: 9,
    title: 'Material Traceability',
    value: 'App9',
  },
]

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const MultiSelectList = Template.bind({})
MultiSelectList.args = {
  items: items,
  label: 'Label Name',
  placeholder: 'Enter label name (type min 2 character)',
  helperText: 'Helper',
  disabled: false,
  error: false,
  margin: 'dense',
  variant: 'filled',
  focused: false,
  popperHeight: 0, // 0 = auto size
  clearText: 'clear',
  noOptionsText: 'No Options',
  buttonAddMore: 'Add More',
  notItemsText: 'not items selected',
  keyTitle: 'title',
  tagSize: 'medium',
  onAddItem: (item: any) => console.log('items:', item),
  filterOptionsArgs: {},
}
