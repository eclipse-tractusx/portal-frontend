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

import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Header } from '.'
import { MemoryRouter } from 'react-router-dom'

export default {
  title: 'frame/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  styles: ['./components/App.css'],
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />

export const Standard = Template.bind({})
Standard.args = {
  main: [
    { name: 'home' },
    { name: 'appstore' },
    {
      name: 'datamanagement',
      children: [
        { name: 'datacatalog' },
        { name: 'digitaltwins' },
        { name: 'semantichub' },
      ],
    },
    { name: 'developerhub' },
  ],
  user: [
    'account',
    'notifications',
    'organization',
    'partner_network',
    'user_management',
    'logout',
  ],
}
