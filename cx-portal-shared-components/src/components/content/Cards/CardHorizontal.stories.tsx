import { ComponentStory } from '@storybook/react'

import { CardHorizontal as Component } from './CardHorizontal'

export default {
  title: 'Cards',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const CardHorizontal = Template.bind({})
CardHorizontal.args = {
  label: 'Catena-X',
  title: 'Digital Twin Debugger',
  borderRadius: 0,
  imagePath: '',
  imageAlt: 'App Card ',
  status: 'release',
  statusText: 'In Release',
}
