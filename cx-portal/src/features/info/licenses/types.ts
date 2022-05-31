import { Nullable, RequestState, TableType } from 'types/MainTypes'

export const name = 'info/licenses'

export type LicenseType = {
  type: string
  data: TableType
}

export type LicensesState = {
  items: Nullable<LicenseType>
  request: RequestState
  error: string
}

export const initialState: LicensesState = {
  items: null,
  request: RequestState.NONE,
  error: '',
}
