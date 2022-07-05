import { ComponentStory } from '@storybook/react'
import { SearchCategory } from 'features/info/search/types'

import { SearchResultItem as Component } from '.'

export default {
  title: 'search/SearchResultItem',
  component: Component,
}

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
)

export const Standard = Template.bind({})
Standard.args = {
  item: {
    id: '1',
    category: SearchCategory.APP,
    title: 'Digital Twin Debugger',
  },
}
