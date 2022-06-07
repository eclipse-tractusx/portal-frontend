import { ComponentStory } from '@storybook/react'

import { PageSnackbar as Component } from '.'

export default {
  title: 'Notifications',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const PageSnackbar = Template.bind({})
PageSnackbar.args = {
  severity: 'success',
  open: true,
  onCloseNotification: () => console.log('close snackbar'),
  title: 'Notification title',
  description: 'This is some notification text and can be replaced later.',
  contactText: 'Contact',
  contactLinks: 'https://portal.dev.demo.catena-x.net/',
  showIcon: true,
  contactNewTab: false,
}
