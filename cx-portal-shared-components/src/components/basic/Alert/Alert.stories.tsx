import { ComponentStory } from '@storybook/react'

import { Alert as Component } from '.'

export default {
  title: 'Alert',
  component: Component,
  argTypes: {
    children: {},
  },
}
const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args}>{args.children}</Component>
)

export const Alert = Template.bind({})
Alert.args = {
  severity: 'info',
  children: <span>Message</span>,
}
