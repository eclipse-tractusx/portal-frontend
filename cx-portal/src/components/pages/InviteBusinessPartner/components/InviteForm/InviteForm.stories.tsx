import { ComponentStory, ComponentMeta } from '@storybook/react'
import { InviteForm } from '.'
import { MemoryRouter } from 'react-router-dom'

export default {
  title: 'frame/InviteForm',
  component: InviteForm,
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
} as ComponentMeta<typeof InviteForm>

const Template: ComponentStory<typeof InviteForm> = (args) => (
  <InviteForm {...args} />
)

export const Standard = Template.bind({})
