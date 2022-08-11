import { ComponentStory } from '@storybook/react'

import { LoadingButton as Component } from '.'

export default {
  title: 'Buttons',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const LoadingButton = Template.bind({})
LoadingButton.args = {
  label: 'Load Data',
  loadIndicator: 'Loading ...',
  loading: true,
  size: 'medium',
  color: 'primary',
  helperTextColor: 'success',
  helperText: 'helperText',
}
