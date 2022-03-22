import { ComponentStory } from '@storybook/react'

import { DialogActions as Component } from './DialogActions'
import { Button } from '../Button'

export default {
  title: 'Modal',
  component: Component,
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args}>
    <Button variant="outlined">Cancel</Button>
    <Button variant="contained">Confirm</Button>
  </Component>
)

export const DialogActions = Template.bind({})
DialogActions.args = {
  helperText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
}
