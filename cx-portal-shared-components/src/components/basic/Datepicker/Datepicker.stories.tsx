import { ComponentStory } from '@storybook/react'

import { Datepicker as Component } from '.'

export default {
  title: 'Datepicker',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const DatePicker = Template.bind({})
DatePicker.args = {
  label: 'Date label',
  placeholder: 'Enter a date',
  helperText: 'Helper',
  disabled: false,
  error: false,
  margin: 'dense',
  variant: 'filled',
  focused: false,
  locale: 'en',
  defaultValue: new Date(),
  readOnly: false,
  onChangeItem: (date: any) => console.log('date:', date),
}
