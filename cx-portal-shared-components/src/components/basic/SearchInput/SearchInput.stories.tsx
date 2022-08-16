import { ComponentStory } from '@storybook/react'
import { IconButton } from '../IconButton'

import MicIcon from '@mui/icons-material/Mic'

import { SearchInput as Component } from '.'

export default {
  title: 'Form',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const SearchInput = Template.bind({})
SearchInput.args = {
  endAndorment: (
    <IconButton>
      <MicIcon sx={{ color: '#939393' }} />
    </IconButton>
  ),
}
