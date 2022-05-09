import { ComponentStory } from '@storybook/react'

import { UserDetailCard as Component } from '.'

export default {
  title: 'Cards',
  component: Component,
}

const cardContent = {
  Name: 'Test',
  Surname: 'Muster',
  'E-Mail': 'max.mustermann@test.de',
  BPN: '1234567',
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <>
    <Component {...args} />
  </>
)

export const UserDetailCard = Template.bind({})
UserDetailCard.args = {
  cardCategory: 'Personal Information',
  cardContentItems: cardContent,
  cardAction: () => {
    console.log('User card action method')
  },
}
