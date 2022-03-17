import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Footer } from '.'
import { MemoryRouter } from 'react-router-dom'

export default {
  title: 'frame/Footer',
  component: Footer,
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
} as ComponentMeta<typeof Footer>

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />

export const Standard = Template.bind({})
Standard.args = {
  pages: [
    'dashboard',
    'appstore',
    'datacatalog',
    'digitaltwins',
    'semantichub',
    'developerhub',
  ],
}
