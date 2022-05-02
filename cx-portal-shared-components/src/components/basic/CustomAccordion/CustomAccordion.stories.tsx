import { Typography } from '@mui/material'
import { ComponentStory } from '@storybook/react'
import { CustomAccordion as Component } from '.'

export default {
  title: 'CustomAccordion',
  component: Component,
  argTypes: {
    children: {},
  },
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args}>
    <Typography>Hello world</Typography>
  </Component>
)

export const CustomAccordion = Template.bind({})
CustomAccordion.args = {
  expanded: true,
  id: 'panel-1',
  title: 'Accordion Title'
}
