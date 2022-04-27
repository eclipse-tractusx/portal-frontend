import { ComponentStory } from '@storybook/react'

import { Rating as Component } from '.'

export default {
  title: 'Rating',
  component: Component,
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const Rating = Template.bind({})
Rating.args = {
  defaultRating: 0,
}
