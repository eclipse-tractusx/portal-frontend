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
import { Box } from '@mui/material'

import { Datepicker as Component } from '.'

export default {
  title: 'Datepicker',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Box sx={{ width: '320px' }}>
    <Component {...args} />
  </Box>
)

export const DatePicker = Template.bind({})
DatePicker.args = {
  label: 'Date label',
  placeholder: 'Enter a date',
  helperText: 'Helper',
  disabled: false,
  error: false,
  margin: 'dense',
  variant: 'filled',
  locale: 'en',
  defaultValue: new Date(),
  readOnly: false,
  daySelectedColor: '#0F71CB',
  todayColor: '#939393',
  onChangeItem: (date: any) => console.log('date:', date),
}
