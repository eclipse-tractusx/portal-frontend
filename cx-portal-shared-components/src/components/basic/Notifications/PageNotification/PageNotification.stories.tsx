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

import { PageNotifications as Component } from '.'

export default {
  title: 'Notifications',
  component: Component,
  argTypes: {},
}
const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args}>{args.children}</Component>
)

export const PageNotifications = Template.bind({})
PageNotifications.args = {
  severity: 'success',
  open: true,
  onCloseNotification: () => console.log('close alert'),
  title: 'Notification title',
  description: 'This is some notification text and can be replaced later.',
  contactText: 'Contact',
  contactLinks: 'https://portal.dev.demo.catena-x.net/',
  showIcon: true,
  contactNewTab: false,
}
