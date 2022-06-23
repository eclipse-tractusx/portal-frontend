import { ComponentStory } from '@storybook/react'

import { MultiSelectList as Component } from '.'

export default {
  title: 'Form',
  component: Component,
  argTypes: {},
}

const items = [
  {
    id: 1,
    title: 'Dismantler App',
    value: 'App1',
  },
  {
    id: 2,
    title: 'Application name',
    value: 'App2',
  },
  {
    id: 3,
    title: 'Title Application',
    value: 'App3',
  },
  {
    id: 4,
    title: 'CX Design lunched',
    value: 'App4',
  },
  {
    id: 5,
    title: 'Fleet Manager',
    value: 'App5',
  },
  {
    id: 6,
    title: 'Fraud Daschboard',
    value: 'App6',
  },
  {
    id: 7,
    title: 'App Manage Customers',
    value: 'App7',
  },
  {
    id: 8,
    title: 'Smart Application',
    value: 'App8',
  },
  {
    id: 9,
    title: 'Material Traceability',
    value: 'App9',
  },
]

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const MultiSelectList = Template.bind({})
MultiSelectList.args = {
  items: items,
  label: 'Label Name',
  placeholder: 'Enter label name (type min 2 character)',
  helperText: 'Helper',
  disabled: false,
  error: false,
  margin: 'dense',
  variant: 'filled',
  focused: false,
  popperHeight: 0, // 0 = auto size
  onAddItem: (item: any) => console.log('items:', item),
}
