import { ComponentStory } from '@storybook/react'
import { ImageItem } from './ImageItem'

export default {
  title: 'ImageGalleryItem',
  component: ImageItem,
}

const Template: ComponentStory<typeof ImageItem> = (args) => (
  <ImageItem {...args} />
)

export const SmallSquareImage = Template.bind({})
SmallSquareImage.args = {
  image: {
    url: 'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
    text: 'Lorem Image Caption',
    size: 'small-square',
    hover: true,
    borderRadius: true,
    shadow: true,
  },
}

export const MediumSquareImage = Template.bind({})
MediumSquareImage.args = {
  image: {
    url: 'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
    text: 'Lorem Image Caption',
    size: 'medium-square',
    hover: true,
    borderRadius: true,
    shadow: true,
  },
}

export const LargeSquareImage = Template.bind({})
LargeSquareImage.args = {
  image: {
    url: 'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
    text: 'Lorem Image Caption',
    size: 'large-square',
    hover: true,
    borderRadius: true,
    shadow: true,
  },
}

export const SmallRectangleImage = Template.bind({})
SmallRectangleImage.args = {
  image: {
    url: 'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
    text: 'Lorem Image Caption',
    size: 'small-rectangle',
    hover: true,
    borderRadius: true,
    shadow: true,
  },
}

export const MediumRectangleImage = Template.bind({})
MediumRectangleImage.args = {
  image: {
    url: 'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
    text: 'Lorem Image Caption',
    size: 'medium-rectangle',
    hover: true,
    borderRadius: true,
    shadow: true,
  },
}

export const LargeRectangleImage = Template.bind({})
LargeRectangleImage.args = {
  image: {
    url: 'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
    text: 'Lorem Image Caption',
    size: 'large-rectangle',
    hover: true,
    borderRadius: true,
    shadow: true,
  },
}
