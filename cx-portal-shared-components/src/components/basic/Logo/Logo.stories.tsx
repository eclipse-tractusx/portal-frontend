import { ComponentStory } from '@storybook/react'

import { Logo as Component } from '.'

export default {
  title: 'Logo',
  component: Component,
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const Logo = Template.bind({})
Logo.args = {
  variant: 'short',
  altText: 'Logo CatenaX',
}
