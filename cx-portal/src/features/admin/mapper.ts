import { CompanyDetails } from './userApiSlice'

export const companyDetailsToCards = (data: CompanyDetails) => [
  {
    head: 'content.organization.company.name',
    data: data.name,
  },
  {
    head: 'content.organization.company.address',
    data: data.streetName,
  },
  {
    head: 'content.organization.company.city',
    data: data.city,
  },
  {
    head: 'content.organization.company.bpn',
    data: data.bpn,
  },
]
