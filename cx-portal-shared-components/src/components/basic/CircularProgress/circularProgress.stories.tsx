import { ComponentStory } from '@storybook/react'

import { CircularProgress as Component } from '.'

export default {
  title: 'Loading',
  component: Component,
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const Loading = Template.bind({})
