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

import { OrderStatusButton as Component } from '.'

export default {
  title: 'Buttons',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const OrderStatusButton = Template.bind({})
OrderStatusButton.args = {
  label: 'Subscribe',
  color: 'primary',
  selectable: false,
  buttonData: [
    {
      isIcon: false,
      buttonLabel: 'Subscribtion initiated',
      zIndex: 4,
      backgroundColor: '#e1e1e1',
    },
    {
      isIcon: true,
      buttonLabel: 'App Instance deployed',
      zIndex: 3,
      backgroundColor: '#f3f3f3',
    },
    {
      isIcon: true,
      buttonLabel: 'Activation, Notifications & credentials',
      zIndex: 2,
      backgroundColor: '#f9f9f9',
    },
  ],
}
