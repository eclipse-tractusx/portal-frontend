import { ComponentStory } from '@storybook/react'

import { SelectList as Component } from '.'

export default {
  title: 'Form',
  component: Component,
  argTypes: {},
}

const items = [
  {
    id: 1,
    title: 'Germany',
    value: 'DE',
  },
  {
    id: 2,
    title: 'France',
    value: 'FR',
  },
  {
    id: 3,
    title: 'Sweden',
    value: 'SW',
  },
  {
    id: 4,
    title: 'Swaziland',
    value: 'SZ',
  },
  {
    id: 5,
    title: 'Argentina',
    value: 'AR',
  },
  {
    id: 6,
    title: 'Brazil',
    value: 'BR',
  },
]

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const SelectList = Template.bind({})
SelectList.args = {
  items: items,
  label: 'Select country',
  placeholder: 'Enter country name (type min 2 character)',
  helperText: 'Helper',
  disabled: false,
  error: false,
  margin: 'dense',
  variant: 'filled',
  focused: false,
  clearText: 'clear',
  noOptionsText: 'No Options',
  popperHeight: 0, // 0 = auto size
  onChangeItem: (item: any) => console.log('selected:', item),
}
