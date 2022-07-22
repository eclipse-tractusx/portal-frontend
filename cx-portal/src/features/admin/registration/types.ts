import { initialPaginResult, PaginResult, RequestState } from 'types/MainTypes'

export const name = 'admin/registration'

export type InviteData = {
  userName: string
  firstName: string
  lastName: string
  email: string
  organisationName: string
}

export type RegistrationRequestAPIResponse = {
  content: Array<RegistrationRequest>
}

export type CompanyDetail = {
  companyId: string
  name: string
  bpn: string
  taxId: string
  streetName: string
  streetNumber: string
  zipCode: string
  city: string
  countryDe: string
}

export type RegistrationRequestDocument = {
  name: string
  document: string
}

export type CompanyApplicationInfo = {
  companyName: string
  email: string
  bpn: string
}

export type RegistrationRequest = {
  applicationId: string
  dateCreated: Date
  companyName: string
  email: string
  bpn: string
  documents: Array<RegistrationRequestDocument>
  applicationStatus: string
}

export type RegistrationRequestDataGrid = {
  applicationId: string
  dateCreated: Date
  companyInfo: CompanyApplicationInfo
  documents: Array<RegistrationRequestDocument>
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
