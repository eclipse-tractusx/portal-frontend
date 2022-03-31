import { ComponentStory } from '@storybook/react'

import { AppCards as Component } from '.'

export default {
  title: 'AppCards',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <>
    <Component {...args} />
  </>
)

const item = {
  title: 'Digital Twin Aspect Debugger',
  subtitle: 'Catena-X',
  image: {
    src: 'https://images.unsplash.com/photo-1517153295259-74eb0b416cee?auto=format&fit=crop&w=640&q=420',
    alt: 'Catena-X AppCard',
  },
  rating: 4.5,
  price: 'free to use',
  description: 'Lorem Ipsum is simply dummy text of the printing.',
  onButtonClick: () => {},
  onSecondaryButtonClick: () => {},
}

export const AppCards = Template.bind({})
AppCards.args = {
  items: [item, item],
  variant: 'minimal',
  buttonText: 'Details',
  columns: 6,
}
