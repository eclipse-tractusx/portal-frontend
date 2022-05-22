import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Header } from '.'
import { MemoryRouter } from 'react-router-dom'

export default {
  title: 'frame/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  styles: ['./components/App.css'],
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />

export const Standard = Template.bind({})
Standard.args = {
  main: [
    { name: 'home' },
    { name: 'appstore' },
    {
      name: 'datamanagement',
      children: [
        { name: 'datacatalog' },
        { name: 'digitaltwins' },
        { name: 'semantichub' },
      ],
    },
    { name: 'developerhub' },
  ],
  user: [
    'account',
    'notifications',
    'organization',
    'partner_network',
    'user_management',
    'logout',
  ],
}
