import { ComponentStory } from '@storybook/react'
import { TabPanel as Component } from './TabPanel'

export default {
  title: 'Tabs',
  component: Component,
  parameters: {
    docs: {
      description: {
        component:
          'TabPanel uses the __value__ parameter for visibility. Value is passed via value-prop in the final implementation (value={value}).',
      },
    },
  },
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args}>TabPanel Content</Component>
)

export const TabPanel = Template.bind({})
TabPanel.args = {
  value: 0,
  index: 0,
}
