import { ComponentStory } from '@storybook/react'

import { Cards as Component } from '.'

export default {
  title: 'Cards',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <>
    <Component {...args} />
  </>
)

const item = {
  title: 'Catena-X News',
  subtitle: 'Catena-X',
  image: {
    src: 'https://images.unsplash.com/photo-1517153295259-74eb0b416cee?auto=format&fit=crop&w=640&q=420',
    alt: 'Catena-X Card',
  },
  description: 'Lorem Ipsum is simply dummy text of the printing.',
  onButtonClick: () => {},
  readMoreText: 'Read more',
  readMoreLink: '#',
}

export const ContentCards = Template.bind({})
ContentCards.args = {
  columns: 6,
  items: [item, item],
  variant: 'text-only',
  buttonText: 'Details',
  imageSize: 'medium',
  imageShape: 'round',
}
