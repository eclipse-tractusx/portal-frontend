import { ComponentStory } from '@storybook/react'
import { SearchCategory, SearchItem } from '.'
import { SearchResult as Component } from './SearchResult'

export default {
  title: 'Search',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

const items: SearchItem[] = [
  {
    id: '123',
    category: SearchCategory.APP,
    title: 'Digital Twin Debugger',
  },
  {
    id: '234',
    category: SearchCategory.APP,
    title: 'Circular Economy',
  },
  {
    id: '8213',
    category: SearchCategory.PARTNER,
    title: 'Search Company',
  },
]

export const Simple = Template.bind({})
Simple.args = {
  items,
}
