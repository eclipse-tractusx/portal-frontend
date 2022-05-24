import { ComponentStory } from '@storybook/react'

import { UserDetails as Component } from '.'

export default {
  title: 'User Details',
  component: Component,
}

const userDetailsCardsContent = [
  {
    category: 'Personal Information',
    items: {
      name: { label: 'Name', value: 'Max' },
      surname: { label: 'Nachname', value: 'Mustermann' },
      email: { label: 'E-Mail', value: 'm.musterman@test.de' },
      bpn: { label: 'BPN', value: '1234567' },
    },
  },
  {
    category: 'Status Information',
    items: {
      status: { label: 'Status', value: 'Aktiv' },
      userCreated: { label: 'Nutzer angelegt', value: '17.02.1989' },
    },
  },
  {
    category: 'Issuer Information',
    items: {
      organisation: { label: 'Organisation', value: 'BMW' },
      adminName: { label: 'Admin Name', value: 'Admin Muster' },
      adminMail: { label: 'Admin E-Mail', value: 'admin.muster@test.de' },
    },
  },
]

const Template: ComponentStory<typeof Component> = (args: any) => (
  <>
    <Component {...args} />
  </>
)

export const UserDetails = Template.bind({})
UserDetails.args = {
  userDetailsCards: userDetailsCardsContent,
  columns: 3,
}
