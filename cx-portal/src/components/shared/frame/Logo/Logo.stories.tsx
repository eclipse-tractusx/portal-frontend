import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { Logo } from './Logo'

export default {
  title: 'frame/Logo',
  component: Logo,
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
} as ComponentMeta<typeof Logo>

const Template: ComponentStory<typeof Logo> = () => <Logo />

export const Standard = Template.bind({})
