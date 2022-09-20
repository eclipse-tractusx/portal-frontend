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

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { GroupItemView } from '.'

export default {
  title: 'frame/GroupItemView',
  component: GroupItemView,
  parameters: {
    layout: 'fullscreen',
  },
  styles: ['./components/App.css'],
} as ComponentMeta<typeof GroupItemView>

const Template: ComponentStory<typeof GroupItemView> = (args) => (
  <GroupItemView {...args} />
)

export const Standard = Template.bind({})
Standard.args = {
  items: [
    {
      id: 'water',
    },
    {
      id: 'two',
    },
    {
      id: 'three',
    },
    {
      id: 'four',
    },
    {
      id: 'five',
    },
    {
      id: 'six',
    },
  ],
}
