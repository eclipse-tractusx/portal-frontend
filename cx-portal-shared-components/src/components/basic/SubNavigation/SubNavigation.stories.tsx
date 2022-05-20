import { ComponentStory } from '@storybook/react'
import { SubNavigation as Component } from '.'

export default {
  title: 'Navigation',
  component: Component,
  argTypes: {
  },
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const SubNavigation = Template.bind({})
SubNavigation.args = {
  buttonLabel: 'Technical User Management',
  onButtonClick: () => console.log('on button click'),
  link1Label: 'Access Management',
  onLink1Click: () => console.log('on link1 click'),
  link2Label: 'Identity User Management',
  onLink2Click: () => console.log('on link2 click'),
}
