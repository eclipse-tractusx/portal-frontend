import { ComponentStory } from '@storybook/react'

import { CircleProgress as Component } from '.'

export default {
  title: 'Progress',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const CircleProgress = Template.bind({})
CircleProgress.args = {
  step: 25,
  interval: 800,
  iteration: true,
  thickness: 8,
  size: 80,
  colorVariant: 'primary',
  variant: 'determinate',
}
