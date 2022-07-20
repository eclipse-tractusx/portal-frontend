import { ComponentStory } from '@storybook/react'

import { CardAddService as Component } from './CardAddService'

export default {
  title: 'Cards',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const AddServiceCard = Template.bind({})
AddServiceCard.args = {
  title: 'Create new App',
  onButtonClick: () => {
    console.log('Add new app')
  },
}
