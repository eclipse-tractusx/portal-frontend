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
import { SearchCategory } from 'features/info/search/types'
import { SearchResult as Component } from '.'

export default {
  title: 'search/SearchResult',
  component: Component,
}

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
)

export const Standard = Template.bind({})
Standard.args = {
  expr: 'mat',
  items: [
    {
      id: '1',
      category: SearchCategory.USECASE,
      title: 'Material Management',
      description: 'Organize your resources',
    },
    {
      id: '2',
      category: SearchCategory.USECASE,
      title: 'Logistics Matrix',
      description: 'Incredible insights',
    },
    {
      id: '3',
      category: SearchCategory.APP,
      title: 'Material Traceability',
      description: 'SUP',
    },
    {
      id: '4',
      category: SearchCategory.APP,
      title: 'Material Manager 2.0',
      description: 'Basch GmbH',
    },
    {
      id: '5',
      category: SearchCategory.APP,
      title: 'Flow Mapper Material',
      description: 'BMW AG',
    },
    {
      id: '6',
      category: SearchCategory.PAGE,
      title: 'Dash Matrix',
    },
    {
      id: '7',
      category: SearchCategory.PARTNER,
      title: 'Matrosoft & Partner GmbH',
    },
    {
      id: '8',
      category: SearchCategory.USER,
      title: 'Mathias Reisinger, BMW',
      description: 'mathias.reisinger@bmw.de',
    },
    {
      id: '9',
      category: SearchCategory.NEWS,
      title: 'Dolores Matlipsum',
      description: 'Samplum deli go brushi ...',
    },
  ],
}
