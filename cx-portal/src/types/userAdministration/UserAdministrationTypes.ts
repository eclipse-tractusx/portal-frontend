export type InviteData = {
  userName: string
  firstName: string
  lastName: string
  email: string
  organizationName: string
}

export type TenantUser = {
  userId: string
  providerUserId: string
  enabled: boolean
  userName: string
  firstName: string
  lastName: string
  email: string
  role?: string
  status?: string
}

export type RegistrationRequestAPIResponse = {
  application_id: string
  changed_date: Date
  Company_name: string
  user_email: string
  BPN: string
  contracts: Array<RegistrationRequestContract>
  street: string
  house_number: string
  plz: string
  city: string
  country: string
  status: string
}

export type RegistrationRequestContract = {
  name: string
  document: string
}

export type CompanyApplicationInfo = {
  companyName: string
  userEmail: string
  bpn: string
}

export type RegistrationRequestDataGrid = {
  applicationId: string
  changedDate: Date
  companyInfo: CompanyApplicationInfo
  contracts: Array<RegistrationRequestContract>
  street: string
  houseNumber: string
  plz: string
  city: string
  country: string
  status: string
}

export interface UserAdministrationInitialState {
  tenantUsers: TenantUser[]
  registrationRequests: Array<RegistrationRequestDataGrid>
  loading: boolean
  error: string
}
