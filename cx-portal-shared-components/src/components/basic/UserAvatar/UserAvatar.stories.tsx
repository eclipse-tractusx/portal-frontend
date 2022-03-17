import { ComponentStory } from '@storybook/react'

import { UserAvatar as Component } from '.'

export default {
  title: 'UserMenu',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const userAvatar = Template.bind({})
userAvatar.args = {
  notificationCount: 0,
  isNotificationAlert: false,
}
