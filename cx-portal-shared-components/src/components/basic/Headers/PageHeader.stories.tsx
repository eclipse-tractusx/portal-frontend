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
PageHeader.args = {
  title: 'Page title',
  hasSubtract: true,
  spacingTop: 0,
  headerHeight: 200,
  subtractOption: 'Option1',
  background: 'LinearGradient1',
}
