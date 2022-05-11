import { ComponentStory } from '@storybook/react'

import { ImageGallery as Component } from '.'

export default {
  title: 'ImageGallery',
  component: Component,
}

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
)

export const Gallery = Template.bind({})
Gallery.args = {
  gallery: [
    {
      url: 'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
      text: 'Lorem Image Caption',
    },
    {
      url: 'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
      text: 'Lorem Image Caption',
    },
    {
      url: 'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
      text: 'Lorem Image Caption',
    },
  ],
}
