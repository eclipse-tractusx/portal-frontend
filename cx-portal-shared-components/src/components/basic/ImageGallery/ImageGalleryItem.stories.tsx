import { ComponentStory } from '@storybook/react'
import { ImageItem } from './ImageItem'

export default {
  title: 'ImageGalleryItem',
  component: ImageItem,
}

const Template: ComponentStory<typeof ImageItem> = (args) => (
  <ImageItem {...args} />
)

export const ImageGalleryItem = Template.bind({})
ImageGalleryItem.args = {
  url: 'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
  text: 'Lorem Image Caption',
  size: 'small-square',
  hover: true,
  borderRadius: true,
  shadow: true,
}
