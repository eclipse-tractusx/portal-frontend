import { ComponentStory } from '@storybook/react'
import { Box } from '@mui/material'

import { Datepicker as Component } from '.'

export default {
  title: 'Datepicker',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Box sx={{ width: '320px' }}>
    <Component {...args} />
  </Box>
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
  locale: 'en',
  defaultValue: new Date(),
  readOnly: false,
  daySelectedColor: '#0F71CB',
  todayColor: '#939393',
  onChangeItem: (date: any) => console.log('date:', date),
}
