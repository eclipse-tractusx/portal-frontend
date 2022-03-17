import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { UserInfo } from './UserInfo'

export default {
  title: 'frame/UserInfo',
  component: UserInfo,
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
} as ComponentMeta<typeof UserInfo>

const Template: ComponentStory<typeof UserInfo> = () => (
  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <UserInfo />
  </div>
)

export const Standard = Template.bind({})
Standard.args = {}
