import { ComponentStory } from '@storybook/react'
import { ViewSelector as Component, view } from '.'

export default {
  title: 'ViewSelector',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <>
    <Component {...args} />
  </>
)

const views: view[] = [
  {
    buttonText: 'All',
    onButtonClick: () => {
      console.log('Switch view')
    },
  },
  {
    buttonText: 'Use Cases',
    onButtonClick: () => {
      console.log('Switch view')
    },
  },
]

export const ViewSelector = Template.bind({})
ViewSelector.args = {
  views: views,
  activeView: 'usecases',
}
