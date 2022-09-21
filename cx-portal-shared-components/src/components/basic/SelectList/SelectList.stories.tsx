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

import { SelectList as Component } from '.'

export default {
  title: 'Form',
  component: Component,
  argTypes: {},
}

const countries = [
  {
    id: 1,
    title: 'Germany',
    value: 'DE',
  },
  {
    id: 2,
    title: 'France',
    value: 'FR',
  },
  {
    id: 3,
    title: 'Sweden',
    value: 'SW',
  },
  {
    id: 4,
    title: 'Swaziland',
    value: 'SZ',
  },
  {
    id: 5,
    title: 'Argentina',
    value: 'AR',
  },
  {
    id: 6,
    title: 'Brazil',
    value: 'BR',
  },
]

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const SelectList = Template.bind({})
SelectList.args = {
  items: countries,
  label: 'Select country',
  placeholder: 'Enter country name (type min 2 character)',
  helperText: 'Helper',
  disabled: false,
  error: false,
  margin: 'dense',
  variant: 'filled',
  focused: false,
  clearText: 'clear',
  noOptionsText: 'No Options',
  popperHeight: 0, // 0 = auto size
  onChangeItem: (item: any) => console.log('selected:', item),
}
