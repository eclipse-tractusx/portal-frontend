import { ComponentStory } from '@storybook/react'
import { FilterSelector as Component, filterView } from '.'

export default {
  title: 'FilterSelector',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <>
    <Component {...args} />
  </>
)

const views: filterView[] = [
  {
    buttonText: 'All',
    onButtonClick: () => {
      console.log('Switch view')
    },
  },
  {
    buttonText: 'By Categories',
    onButtonClick: () => {
      console.log('Switch view')
    },
  },
]

export const FilterSelector = Template.bind({})
FilterSelector.args = {
  filterViews: views,
  activeFilter: 'bycategories',
}
