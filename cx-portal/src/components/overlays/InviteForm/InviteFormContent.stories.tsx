import { ComponentStory, ComponentMeta } from '@storybook/react'
import { InviteFormContent } from './InviteFormContent'
import { MemoryRouter } from 'react-router-dom'

export default {
  title: 'frame/InviteForm',
  component: InviteFormContent,
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
} as ComponentMeta<typeof InviteFormContent>

const Template: ComponentStory<typeof InviteFormContent> = (args) => (
  <InviteFormContent {...args} />
)

export const Standard = Template.bind({})
