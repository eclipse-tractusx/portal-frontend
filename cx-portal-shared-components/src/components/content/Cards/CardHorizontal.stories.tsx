import { ComponentStory } from '@storybook/react'
import { EnumStatusVariants } from './Card'

import { CardHorizontal as Component } from './CardHorizontal'

export default {
  title: 'Cards',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const CardHorizontal = Template.bind({})
CardHorizontal.args = {
  label: 'Catena-X',
  title: 'Digital Twin Debugger',
  borderRadius: 20,
  imagePath: '',
  imageAlt: 'App Card ',
  status: EnumStatusVariants.release,
  statusText: 'In Release',
}
