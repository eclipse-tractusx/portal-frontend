/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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

import { StaticTemplate as Component } from '.'

export default {
  title: 'StaticTemplates',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const TextImageTemplates = Template.bind({})
TextImageTemplates.args = {
  sectionInfo: [
    {
      title: 'Intro headline',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .",
      videoUrl: 'https://www.youtube.com/embed/g-NVjP2srw4',
      id: 'intro-id',
      backgroundColor: '#FFFFFF',
      template: 'TextVideoSideBySide',
    },
    {
      title: 'Intro headline',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .",
      videoUrl: 'https://www.youtube.com/embed/g-NVjP2srw4',
      id: 'intro-id',
      backgroundColor: '#FFFFFF',
      template: 'VideoTextSideBySide',
    },
    {
      title: 'Headline / Question',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .",
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
      backgroundColor: '#F9F9F9',
      id: 'data-id',
      template: 'TextImageCenterAligned',
    },
    {
      title: 'Headline / Question',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .",
      backgroundColor: '#F9F9F9',
      id: 'data1-id',
      template: 'TextCenterAligned',
    },
    {
      title: 'Headline / Question',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .",
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
      backgroundColor: '#F9F9F9',
      id: 'data2-id',
      template: 'TextImageSideBySide',
    },
  ],
}

export const GridTemplates = Template.bind({})
GridTemplates.args = {
  sectionInfo: [
    {
      title: 'Section Title',
      description:
        'description such as an introduction or explaination / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards',
      backgroundColor: '#FFFFFF',
      id: 'business-id',
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
      grid: 4,
      template: 'TextCenterAlignedWithCardGrid',
      detailsWithImageRow1: [
        {
          title: 'Card Title 1',
          imageUrl:
            'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
          description: 'Card element description, with limited size.',
          readMore: '/appmarketplace',
          readMoreTitle: 'Details',
          backgroundColor: '#f9f9f9',
          align: 'center',
        },
        {
          title: 'Card Title 2',
          imageUrl:
            'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
          description: 'Card element description, with limited size.',
          readMore: '',
          backgroundColor: '#f9f9f9',
          align: 'center',
        },
        {
          title: 'Card Title 3',
          imageUrl:
            'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
          description: 'Card element description, with limited size.',
          readMore: '',
          backgroundColor: '#f9f9f9',
          align: 'center',
        },
        {
          title: 'Card Title 4',
          imageUrl:
            'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
          description: 'Card element description, with limited size.',
          readMore: '',
          backgroundColor: '#f9f9f9',
          align: 'center',
        },
      ],
    },
    {
      title: 'Direct Links / What Else Do You Need To Know',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .",
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
      backgroundColor: '#FFFFFF',
      grid: 2,
      id: 'section-one',
      template: 'TextCenterAlignedWithLinkButtonGrid',
      linksRow1: [
        {
          background: '#C498EF63',
          title: 'Sample Name',
          navigate: '/appmanagement',
        },
        {
          background: '#C498EF63',
          title: 'Sample Name',
          navigate: '/appmanagement',
        },
      ],
      linksRow2: [
        {
          background: '#C498EF63',
          title: 'Sample Name',
          navigate: '/appmanagement',
        },
      ],
    },
    {
      title: 'Section Title',
      description:
        'description such as an introduction or explaination / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards',
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
      backgroundColor: '#FFFFFF',
      id: 'provider-id',
      template: 'TextImageSideBySideWithCardGrid',
      detailsWithImageRow1: [
        {
          title: 'Card Title 1',
          imageUrl:
            'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
          description:
            'description such as an introduction or explaination / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards',
          readMore: '/help',
          readMoreTitle: 'Details',
          backgroundColor: '#F9F9F9',
        },
        {
          title: 'Card Title 2',
          imageUrl:
            'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
          description:
            'description such as an introduction or explaination / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards',
          readMore: '/help',
          backgroundColor: '#F9F9F9',
        },
        {
          title: 'Card Title 3',
          imageUrl:
            'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
          description:
            'description such as an introduction or explaination / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards',
          readMore: '/help',
          readMoreTitle: 'Details',
          backgroundColor: '#F9F9F9',
        },
      ],
      detailsWithoutImageRow1: [
        {
          title: 'Card Title 1',
          imageUrl: '',
          description: 'Card element description, with limited size.',
          readMore: '',
          readMoreTitle: 'Details',
          backgroundColor: '#FFFFFF',
        },
        {
          title: 'Card Title 2',
          imageUrl: '',
          description: 'Card element description, with limited size.',
          readMore: '',
          readMoreTitle: 'Details',
          backgroundColor: '#FFFFFF',
        },
        {
          title: 'Card Title 3',
          imageUrl: '',
          description: 'Card element description, with limited size.',
          readMore: '',
          readMoreTitle: 'Details',
          backgroundColor: '#FFFFFF',
        },
      ],
    },
  ],
}
