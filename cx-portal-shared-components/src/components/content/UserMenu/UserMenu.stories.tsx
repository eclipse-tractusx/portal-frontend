import { ComponentStory } from '@storybook/react'

import { UserMenu as Component } from '.'
import { LanguageSwitch } from '../../basic/LanguageSwitch'
import { UserNav } from '../UserNav'

export default {
  title: 'UserMenu',
  component: Component,
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args}>
    <UserNav
      items={[
        { href: '/account', title: 'My Account' },
        { href: '/notification', title: 'Notification Center' },
        { href: '/organisation', title: 'Organisation' },
      ]}
    />
    <UserNav items={[{ href: '/logout', title: 'Logout' }]} />
    <LanguageSwitch
      current="de"
      languages={[{ key: 'de' }, { key: 'en' }]}
      onChange={() => {}}
    />
  </Component>
)

export const UserMenu = Template.bind({})
UserMenu.args = {
  open: true,
  userName: 'Max Mustermann',
  userRole: 'Admin',
}
