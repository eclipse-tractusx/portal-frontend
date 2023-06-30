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
import { SearchCategory } from 'features/info/search/types'
import { SearchResultItem as Component } from '.'

const Story = {
  title: 'search/SearchResultItem',
  component: Component,
}

export default Story

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
)

export const Standard = Template.bind({})
Standard.args = {
  item: {
    id: '1',
    category: SearchCategory.APP,
    title: 'Digital Twin Debugger',
  },
}
