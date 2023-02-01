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

import { ProcessList as Component } from '.'

export default {
  title: 'ProcessList',
  component: Component,
  argTypes: {},
}

const processListElements = [
  {
    step: 1,
    headline: 'App Market Card',
    description:
      'descsription Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
  },
  {
    step: 2,
    headline: 'App Page',
    description:
      'App Page descsription sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
  },
  {
    step: 3,
    headline: 'Contrac & Consent',
    description:
      'Contrac & Consent descsription Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
  },
  {
    step: 4,
    headline: 'Technical Integration',
    description:
      'Technical Integration descsription consetetur sadipscing elitr Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
  },
  {
    step: 5,
    headline: 'Beta Test',
    description:
      'Beta Test descsription Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
  },
  {
    step: 6,
    headline: 'Validate & Publish',
    description:
      'Validate & Publish descsription sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
  },
]

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const ProcessList = Template.bind({})
ProcessList.args = {
  list: processListElements,
  stepsColor: '#FFA600',
  stepsFontColor: '#fff',
  elementNumbers: 6,
}
