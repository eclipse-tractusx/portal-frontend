import { initialPaginResult, PaginResult, RequestState } from "types/MainTypes"

export const name = 'admin/registration'

export type InviteData = {
  userName: string
  firstName: string
  lastName: string
  email: string
  organisationName: string
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

export type CompanyDetail = {
  companyId: string
  name: string
  bpn: string
  taxId: string
  streetname: string
  streetnumber: string
  zipcode: string
  city: string
  countryDe: string
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

export interface AdminRegistrationState {
  registrationRequests: Array<RegistrationRequestDataGrid>
  companyDetail: CompanyDetail
  loading: boolean
  detailLoading: boolean
  error: string
  request: RequestState
  data: PaginResult<InvitesDataGrid>
}

export const initialState: AdminRegistrationState = {
  registrationRequests: [],
  companyDetail: {} as CompanyDetail,
  loading: false,
  detailLoading: false,
  error: '',
  request: RequestState.NONE,
  data: initialPaginResult,
}

export type InvitesDataGrid = {
  applicationStatus: string
  dateCreated: Date
  companyName: string
  firstName: string
  lastName: string
  email: string
}