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

import { ComponentStory } from '@storybook/react'

import { Navigation as Component } from '.'

export default {
  title: 'Navigation',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

const items = [
  {
    href: '/home',
    title: 'home',
    children: [
      { href: '/home-1', title: 'home 1' },
      {
        href: '/home-2',
        title: 'home 2',
        children: [
          {
            href: '/home-2/1',
            title: 'Submenu 1 ',
            children: [{ href: '/', title: 'Sub-Submenu' }],
          },
          { href: '/home-2/2', title: 'Submenu 2 ' },
        ],
      },
    ],
  },
  { href: '/appstore', title: 'App Store' },
  { href: '/data-catalog', title: 'Data Catalog' },
]

const itemsFirstLevel = items.map(({ href, title }) => ({ href, title }))

export const Unstyled = Template.bind({})
Unstyled.args = {
  items: itemsFirstLevel,
  active: '/home',
  unstyled: true,
}

export const Simple = Template.bind({})
Simple.args = {
  items: itemsFirstLevel,
  active: '/home',
}

export const WithDropdown = Template.bind({})
WithDropdown.args = {
  items,
  active: '/home',
}
