import { ComponentStory } from '@storybook/react'

import { Button as Component } from '.'

export default {
  title: 'Buttons',
  component: Component,
  argTypes: {
    children: {
      name: 'label',
    },
    onClick: {
      action: 'onClick',
    },
  },
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const Button = Template.bind({})
Button.args = {
  color: 'primary',
  size: 'large',
  disabled: false,
  children: 'Button',
}
