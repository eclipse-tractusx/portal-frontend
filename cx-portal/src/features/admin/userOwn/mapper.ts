import { OwnUser } from './types'

export const userDetailsToCards = (user: OwnUser) => [
  {
    cardCategory: 'Personal Information',
    cardContentItems: {
      name: { label: 'Name', value: user.firstName },
      surname: { label: 'Nachname', value: user.lastName },
      email: { label: 'E-Mail', value: user.email },
      bpn: { label: 'BPN', value: user.bpn },
    },
  },
  {
    cardCategory: 'Status Information',
    cardContentItems: {
      status: { label: 'Status', value: user.status },
      userCreated: {
        label: 'Nutzer angelegt',
        value: user.created.substring(0, 16).replace('T', ' '),
      },
    },
  },
  {
    cardCategory: 'Issuer Information',
    cardContentItems: {
      organisation: { label: 'Organisation', value: 'BMW' },
      adminName: { label: 'Admin Name', value: 'Admin Muster' },
      adminMail: { label: 'Admin E-Mail', value: 'admin.muster@test.de' },
    },
  },
]
