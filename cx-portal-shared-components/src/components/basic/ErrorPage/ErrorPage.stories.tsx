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

import { ErrorPage as Component } from '.'

export default {
  title: 'ErrorPage',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const ErrorPage = Template.bind({})
ErrorPage.args = {
  hasNavigation: false,
  header: '500 Internal Server Error',
  title: 'Oops, Something went wrong.',
  description:
    'The server encountered an internal error or misconfiguration and was unable to complete your request.',
  additionalDescription: 'Please contact your admin.',
  reloadButtonTitle: 'Reload Page',
  homeButtonTitle: 'Homepage',
  onReloadClick: () => console.log('reload'),
  onHomeClick: () => console.log('home page'),
}
