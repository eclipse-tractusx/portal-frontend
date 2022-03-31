import { ComponentStory } from '@storybook/react'
import { StatusTag as Component } from '.'

export default {
  title: 'StatusTag',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const StatusTag = Template.bind({})
StatusTag.args = {
  color: 'label',
  variant: 'filled',
  label: 'label',
}
