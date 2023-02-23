/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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
import { SortOption as Component } from '.'

export default {
  title: 'SortOption',
  component: Component,
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <div
    style={{
      position: 'absolute',
      background: '#f9f9f9',
      boxShadow: '0px 10px 20px rgb(80 80 80 / 30%)',
      borderRadius: '16px',
      zIndex: '9',
    }}
  >
    <Component {...args} setSortOption={() => {}} />
  </div>
)

export const SortOption = Template.bind({})

SortOption.args = {
  sortOptions: [
    {
      label: 'New',
      value: 'new',
    },
    {
      label: 'Priority',
      value: 'priority',
    },
    {
      label: 'Unread',
      value: 'unread',
    },
  ],
  selectedOption: 'new',
  show: true,
}
