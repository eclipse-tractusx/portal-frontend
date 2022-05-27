import { ComponentStory } from '@storybook/react'

import { PageNotifications as Component } from '.'

export default {
  title: 'Notifications',
  component: Component,
  argTypes: {},
}
const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args}>{args.children}</Component>
)

export const PageNotifications = Template.bind({})
PageNotifications.args = {
  severity: 'success',
  onCloseAlert: () => console.log('close alert'),
  title: 'Notification title',
  description: 'This is some notification text and can be replaced later.',
  contactText: 'Contact',
  contactLinks: 'https://portal.dev.demo.catena-x.net/',
  showIcon: true,
  contactNewTab: false,
}
