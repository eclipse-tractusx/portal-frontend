import { ComponentStory } from '@storybook/react'
import { SearchCategory } from 'features/info/search/types'
import { SearchResultGroup as Component } from '.'

export default {
  title: 'search/SearchResultGroup',
  component: Component,
}

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
)

export const Standard = Template.bind({})
Standard.args = {
  category: SearchCategory.APP,
  expr: 'mat',
  items: [
    {
      id: '3',
      category: SearchCategory.APP,
      title: 'Material Traceability',
      description: 'SUP',
    },
    {
      id: '4',
      category: SearchCategory.APP,
      title: 'Material Manager 2.0',
      description: 'Basch GmbH',
    },
    {
      id: '5',
      category: SearchCategory.APP,
      title: 'Flow Mapper Material',
      description: 'BMW AG',
    },
  ],
}
