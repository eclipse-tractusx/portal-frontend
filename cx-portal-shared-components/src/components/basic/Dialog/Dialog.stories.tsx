import { ComponentStory } from '@storybook/react'

import { Dialog as Component } from '.'
import { Button } from '../Button'
import { DialogActions } from './DialogActions'
import { DialogContent } from './DialogContent'
import { DialogHeader } from './DialogHeader'

export default {
  title: 'Modal',
  component: Component,
}

const DialogTemplate: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args}>
    <DialogHeader
      title="Title"
      intro="Optional intro. Lorem ipsum dolor sit amet consectetur adipisicing elit."
    />
    <DialogContent>Content goes here.</DialogContent>
    <DialogActions helperText="Lorem ipsum dolor sit amet consectetur adipisicing elit.">
      <Button variant="outlined">Cancel</Button>
      <Button variant="contained">Confirm</Button>
    </DialogActions>
  </Component>
)

export const Dialog = DialogTemplate.bind({})
Dialog.args = {
  open: true,
}
