import { ComponentStory } from '@storybook/react'

import { MainHeader as Component } from './MainHeader'

export default {
  title: 'Headers',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const MainHeader = Template.bind({})
MainHeader.args = {
  title: 'Page title',
  topPage: false,
  headerHeight: 645,
  background: 'LinearGradient1',
}
