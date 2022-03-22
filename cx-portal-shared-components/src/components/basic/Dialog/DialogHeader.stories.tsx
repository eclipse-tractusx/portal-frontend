import { ComponentStory } from '@storybook/react'

import { DialogHeader as Component } from './DialogHeader'

export default {
  title: 'Modal',
  component: Component,
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const DialogHeader = Template.bind({})
DialogHeader.args = {
  title: 'Title',
  intro:
    'Optional intro. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
}
