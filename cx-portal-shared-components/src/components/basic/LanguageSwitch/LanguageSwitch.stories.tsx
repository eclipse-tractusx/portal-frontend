import { ComponentStory } from '@storybook/react'

import { LanguageSwitch as Component } from '.'

export default {
  title: 'UserMenu',
  component: Component,
  argTypes: {
    onChange: {
      action: 'onChange',
    },
  },
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const LanguageSwitch = Template.bind({})
LanguageSwitch.args = {
  current: 'de',
  languages: [{ key: 'de' }, { key: 'en', name: 'ENG' }],
}
