import { createSlice } from '@reduxjs/toolkit'
import {
  CompanyDetail,
  RegistrationRequestAPIResponse,
  RegistrationRequestDataGrid,
  AdminRegistrationState,
} from './types'
import { fetchRegistrationRequests, fetchCompanyDetail } from './actions'
import { mapRegistrationRequestResponseToDataGrid } from 'utils/dataMapper'
import { RootState } from 'state/store'

const initialState: AdminRegistrationState = {
  registrationRequests: [],
  companyDetail: {} as CompanyDetail,
  loading: false,
  detailLoading: false,
  error: '',
}

const adminRegistrationSlice = createSlice({
  name: 'admin/user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRegistrationRequests.pending, (state) => {
      state.registrationRequests = []
      state.loading = true
      state.error = ''
    })
    builder.addCase(
      fetchRegistrationRequests.fulfilled,
      (state, { payload }) => {
        const payloadList = payload as Array<RegistrationRequestAPIResponse>
        state.registrationRequests =
          (mapRegistrationRequestResponseToDataGrid(
            payloadList
          ) as Array<RegistrationRequestDataGrid>) || []
        state.loading = false
        state.error = ''
      }
    )
    builder.addCase(fetchRegistrationRequests.rejected, (state, action) => {
      state.registrationRequests = []
      state.loading = false
      state.error = action.error.message as string
    })
    builder.addCase(fetchCompanyDetail.pending, (state) => {
      state.detailLoading = true
      state.companyDetail = {} as CompanyDetail
      state.error = ''
    })
    builder.addCase(fetchCompanyDetail.fulfilled, (state, { payload }) => {
      state.companyDetail = payload as CompanyDetail
      state.detailLoading = false
      state.error = ''
    })
    builder.addCase(fetchCompanyDetail.rejected, (state, action) => {
      state.companyDetail = {} as CompanyDetail
      state.detailLoading = false
      state.error = action.error.message as string
    })
  },
})

export const adminRegistrationSelector = (
  state: RootState
): AdminRegistrationState => state.adminRegistration

export const registrationRequestsSelector = (
  state: RootState
): RegistrationRequestDataGrid[] => state.adminRegistration.registrationRequests

export default adminRegistrationSlice
