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
import { CarouselBox as Component } from './CarouselBox'
import { theme } from '../../../theme'
import uniqueId from 'lodash/uniqueId'

export default {
  title: 'Carousel',
  component: Component,
  argTypes: {
    children: {},
  },
}

const itemsArray = [
  'Element 1',
  'Element 2',
  'Element 3',
  'Element 4',
  'Element 5',
]

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args}>
    {itemsArray.map((item: string) => {
      return (
        <div
          style={{
            borderRadius: '20px',
            height: '100%',
            width: 'auto',
            border: '1px',
            borderStyle: 'solid',
            borderColor: theme.palette.border.border01,
          }}
          key={uniqueId('carousel-item')}
        >
          <div style={{ width: 'fit-content', margin: '20px auto' }}>
            {item}
          </div>
        </div>
      )
    })}
  </Component>
)

export const CarouselBox = Template.bind({})
CarouselBox.args = {
  dots: true,
  title: 'My Favorite',
  itemWidth: 266,
  itemHeight: 235,
  backgroundColor: '#fff',
  hasBorder: true,
  borderRadius: 20,
}
