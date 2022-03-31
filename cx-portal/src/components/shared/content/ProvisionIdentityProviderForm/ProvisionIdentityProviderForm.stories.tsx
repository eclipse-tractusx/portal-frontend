import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ProvisionIdentityProviderForm } from '.'
import { MemoryRouter } from 'react-router-dom'

export default {
  title: 'frame/ProvisionIdentityProviderForm',
  component: ProvisionIdentityProviderForm,
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
} as ComponentMeta<typeof ProvisionIdentityProviderForm>

const Template: ComponentStory<typeof ProvisionIdentityProviderForm> = (
  args
) => <ProvisionIdentityProviderForm {...args} />

export const Standard = Template.bind({})
