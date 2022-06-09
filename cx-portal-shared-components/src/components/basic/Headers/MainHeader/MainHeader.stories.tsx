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
  title: 'Catena-X',
  subTitle: 'the gateway to the automotive digital network',
  subTitleWidth: 787,
  headerHeight: 645,
  background: 'LinearGradient1',
}
