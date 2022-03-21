import { ComponentStory } from '@storybook/react'

import { Navigation as Component } from '.'

export default {
  title: 'Navigation',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

const items = [
  {
    href: '/dashboard',
    title: 'Dashboard',
    children: [
      { href: '/dashboard-1', title: 'Dashboard 1' },
      {
        href: '/dashboard-2',
        title: 'Dashboard 2',
        children: [
          {
            href: '/dashboard-2/1',
            title: 'Submenu 1 ',
            children: [{ href: '/', title: 'Sub-Submenu' }],
          },
          { href: '/dashboard-2/2', title: 'Submenu 2 ' },
        ],
      },
    ],
  },
  { href: '/appstore', title: 'App Store' },
  { href: '/data-catalog', title: 'Data Catalog' },
]

const itemsFirstLevel = items.map(({ href, title }) => ({ href, title }))

export const Unstyled = Template.bind({})
Unstyled.args = {
  items: itemsFirstLevel,
  active: '/dashboard',
  unstyled: true,
}

export const Simple = Template.bind({})
Simple.args = {
  items: itemsFirstLevel,
  active: '/dashboard',
}

export const WithDropdown = Template.bind({})
WithDropdown.args = {
  items,
  active: '/dashboard',
}
