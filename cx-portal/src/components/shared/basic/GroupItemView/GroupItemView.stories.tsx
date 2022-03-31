import { ComponentStory, ComponentMeta } from '@storybook/react'
import { GroupItemView } from '.'

export default {
  title: 'frame/GroupItemView',
  component: GroupItemView,
  parameters: {
    layout: 'fullscreen',
  },
  styles: ['./components/App.css'],
} as ComponentMeta<typeof GroupItemView>

const Template: ComponentStory<typeof GroupItemView> = (args) => (
  <GroupItemView {...args} />
)

export const Standard = Template.bind({})
Standard.args = {
  items: [
    {
      id: 'water',
    },
    {
      id: 'two',
    },
    {
      id: 'three',
    },
    {
      id: 'four',
    },
    {
      id: 'five',
    },
    {
      id: 'six',
    },
  ],
}
