import { ComponentStory } from '@storybook/react'
import { SearchCategory } from 'features/info/search/types'
import { groupBy } from 'lodash'
import { SearchResult as Component } from '.'

export default {
  title: 'search/SearchResult',
  component: Component,
}

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
)

export const Standard = Template.bind({})
Standard.args = {
  expr: 'mat',
  items: [
    {
      id: '1',
      category: SearchCategory.USECASE,
      title: 'Material Management',
      description: 'Organize your resources',
    },
    {
      id: '2',
      category: SearchCategory.USECASE,
      title: 'Logistics Matrix',
      description: 'Incredible insights',
    },
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
    {
      id: '6',
      category: SearchCategory.PAGE,
      title: 'Dash Matrix',
    },
    {
      id: '7',
      category: SearchCategory.PARTNER,
      title: 'Matrosoft & Partner GmbH',
    },
    {
      id: '8',
      category: SearchCategory.USER,
      title: 'Mathias Reisinger, BMW',
      description: 'mathias.reisinger@bmw.de',
    },
    {
      id: '9',
      category: SearchCategory.NEWS,
      title: 'Dolores Matlipsum',
      description: 'Samplum deli go brushi ...',
    },
  ],
}
