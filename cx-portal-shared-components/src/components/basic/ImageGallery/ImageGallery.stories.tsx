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

import { ImageGallery as Component } from '.'

export default {
  title: 'ImageGallery',
  component: Component,
}

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
)

export const GridMediumSquareGallery = Template.bind({})
GridMediumSquareGallery.args = {
  gallery: [
    {
      url: 'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
      text: 'Lorem Image Caption1',
      size: 'medium-square',
      hover: false,
      borderRadius: true,
      shadow: true,
    },
    {
      url: 'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
      text: 'Lorem Image Caption2',
      size: 'medium-square',
      hover: false,
      borderRadius: true,
      shadow: true,
    },
    {
      url: 'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
      text: 'Lorem Image Caption3',
      size: 'medium-square',
      hover: false,
      borderRadius: true,
      shadow: true,
    },
  ],
}

export const FlexGallery = Template.bind({})
FlexGallery.args = {
  gallery: [
    {
      url: 'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
      text: 'Lorem Image Caption',
      size: 'small-square',
      hover: false,
      borderRadius: true,
      shadow: true,
    },
    {
      url: 'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
      text: 'Lorem Image Caption',
      size: 'small-rectangle',
      hover: false,
      borderRadius: true,
      shadow: false,
    },
    {
      url: 'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
      text: 'Lorem Image Caption',
      size: 'small-square',
      hover: false,
      borderRadius: false,
      shadow: true,
    },
    {
      url: 'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
      text: 'Lorem Image Caption',
      size: 'small-square',
      hover: false,
      borderRadius: false,
      shadow: true,
    },
    {
      url: 'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
      text: 'Lorem Image Caption',
      size: 'small-square',
      hover: false,
      borderRadius: false,
      shadow: true,
    },
  ],
}
