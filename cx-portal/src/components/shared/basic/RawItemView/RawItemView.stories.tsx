import { ComponentStory, ComponentMeta } from '@storybook/react'
import { RawItemView } from '.'

export default {
  title: 'frame/RawItemView',
  component: RawItemView,
  parameters: {
    layout: 'fullscreen',
  },
  styles: ['./components/App.css'],
} as ComponentMeta<typeof RawItemView>

const Template: ComponentStory<typeof RawItemView> = (args) => (
  <RawItemView {...args} />
)

export const Standard = Template.bind({})
Standard.args = {
  items: [
    {
      id: 'one',
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
