import { ComponentStory } from '@storybook/react'

import { UserNav as Component } from '.'

export default {
  title: 'UserMenu',
  component: Component,
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const UserNav = Template.bind({})
UserNav.args = {
  items: [
    { href: '/account', title: 'My Account' },
    { href: '/notification', title: 'Notification Center' },
    { href: '/organisation', title: 'Organisation' },
    { href: '/logout', title: 'Logout' },
  ],
}
