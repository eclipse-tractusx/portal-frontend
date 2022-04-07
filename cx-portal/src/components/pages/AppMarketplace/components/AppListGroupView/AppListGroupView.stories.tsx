import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AppListGroupView } from '.'

export default {
  title: 'frame/GroupItemView',
  component: AppListGroupView,
  parameters: {
    layout: 'fullscreen',
  },
  styles: ['./components/App.css'],
} as ComponentMeta<typeof AppListGroupView>

const Template: ComponentStory<typeof AppListGroupView> = (args) => (
  <AppListGroupView {...args} />
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
