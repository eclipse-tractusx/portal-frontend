import { createSlice } from '@reduxjs/toolkit'
import {
  CompanyDetail,
  RegistrationRequestAPIResponse,
  RegistrationRequestDataGrid,
  AdminRegistrationState,
  initialState,
  name,
} from './types'
import { fetchRegistrationRequests, fetchCompanyDetail } from './actions'
import { mapRegistrationRequestResponseToDataGrid } from 'utils/dataMapper'
import { RootState } from 'features/store'

export const slice = createSlice({
  name,
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
          mapRegistrationRequestResponseToDataGrid(payloadList) || []
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
): AdminRegistrationState => state.admin.registration

export const registrationRequestsSelector = (
  state: RootState
): RegistrationRequestDataGrid[] =>
  state.admin.registration.registrationRequests

const Slice = { slice }

export default Slice
