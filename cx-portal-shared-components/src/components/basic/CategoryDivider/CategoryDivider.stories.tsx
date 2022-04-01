import { ComponentStory } from '@storybook/react'

import { CategoryDivider as Component } from '.'

export default {
  title: 'CategoryDivider',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <>
    <Component {...args} />
  </>
)

export const CategoryDivider = Template.bind({})
CategoryDivider.args = {
  categoryName: 'Favorites',
  categoryItemsLength: 128,
  buttonText: 'More'
}
