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
import { Chip as Component } from '.'

import {
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs'

export default {
  title: 'Chip',
  component: Component,
  argTypes: {},
  parameters: {
    docs: {
      page: () => (
        <>
          <h1>Catena-X Chip Component</h1>
          <p>
            Chip component used the same way as described in the
            <a
              href="https://mui.com/components/chips/"
              target="_blank"
              rel="noreferrer"
            >
              MUI Chip
            </a>{' '}
            documentation with
            <a
              href="https://mui.com/api/chips/"
              target="_blank"
              rel="noreferrer"
            >
              MUI Chip API
            </a>
            <p style={{ color: 'red' }}>
              Please take a look to "Examples" stories doc page for example
              usages
            </p>
          </p>
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const Chip = Template.bind({})
Chip.args = {
  color: 'secondary',
  variant: 'filled',
  label: 'decline',
  type: 'decline',
  onClick: () => console.log('Decline clicked'),
  withIcon: true,
  handleDelete: () => console.log('onDelete clicked'),
}
