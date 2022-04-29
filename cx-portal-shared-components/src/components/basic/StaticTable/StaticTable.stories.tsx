import { ComponentStory } from '@storybook/react'

import { StaticTable as Component } from '.'

export default {
  title: 'StaticTable',
  component: Component,
}

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
)

export const Table = Template.bind({})
Table.args = {
  horizontal: false,
  data: {
    "head": [
      "heading 1", "heading 2"
    ],
    "body": [
      [ "row1 col1",  "row1 col2" ],
      [ "row2 col1",  "row2 col2" ],
      [ "row3 col1",  "row3 col2" ],
      [ "row4 col1",  "row4 col2" ]
    ]
  }
}
