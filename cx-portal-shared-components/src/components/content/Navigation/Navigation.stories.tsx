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
    href: '/home',
    title: 'home',
    children: [
      { href: '/home-1', title: 'home 1' },
      {
        href: '/home-2',
        title: 'home 2',
        children: [
          {
            href: '/home-2/1',
            title: 'Submenu 1 ',
            children: [{ href: '/', title: 'Sub-Submenu' }],
          },
          { href: '/home-2/2', title: 'Submenu 2 ' },
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
  active: '/home',
  unstyled: true,
}

export const Simple = Template.bind({})
Simple.args = {
  items: itemsFirstLevel,
  active: '/home',
}

export const WithDropdown = Template.bind({})
WithDropdown.args = {
  items,
  active: '/home',
}
