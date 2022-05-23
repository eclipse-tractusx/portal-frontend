import { ComponentStory } from '@storybook/react'

import { PageHeader as Component } from './PageHeader'

export default {
  title: 'Headers',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const PageHeader = Template.bind({})
PageHeader.args = {}
