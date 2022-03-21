import { ComponentStory } from '@storybook/react'

import { Menu as Component } from '.'

export default {
  title: 'Menu',
  component: Component,
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const Menu = Template.bind({})
Menu.args = {
  items: [
    {
      href: '/1',
      title: 'Menu Item 1',
      children: [
        { href: '/1/1', title: 'Submenu Item 1' },
        { href: '/1/2', title: 'Submenu Item 2' },
      ],
    },
    { href: '/2', title: 'Menu Item 2' },
    { href: '/3', title: 'Menu Item 3' },
  ],
}
