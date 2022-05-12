import { ComponentStory } from '@storybook/react'
import { Snackbar as Component } from '.'
import { Typography } from '../Typography'

export default {
  title: 'Snackbar',
  component: Component,
  argTypes: {
    children: {},
  },
}
const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args}>{args.children}</Component>
)

export const Alert = Template.bind({})
Alert.args = {
  severity: 'success',
  children: <Typography sx={{color: 'white'}}>Message</Typography>,
}
