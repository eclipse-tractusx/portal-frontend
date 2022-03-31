import { ComponentStory } from '@storybook/react'

import { IconButton as Component } from '.'
import AddIcon from '@mui/icons-material/Add'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export default {
  title: 'Buttons',
  component: Component,
  argTypes: {
    onClick: {
      action: 'onClick',
    },
  },
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const IconButton = Template.bind({})
IconButton.args = {
  color: 'primary',
  size: 'medium',
  disabled: false,
  children: <AddIcon />,
}

export const ArrowButton = Template.bind({})
ArrowButton.args = {
  color: 'secondary',
  size: 'medium',
  disabled: false,
  children: <ArrowForwardIcon />,
}
