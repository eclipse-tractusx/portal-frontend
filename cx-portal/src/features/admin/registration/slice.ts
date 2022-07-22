import { createSlice } from '@reduxjs/toolkit'
import {
  CompanyDetail,
  RegistrationRequestAPIResponse,
  RegistrationRequestDataGrid,
  AdminRegistrationState,
  initialState,
  name,
  RegistrationRequest,
  InvitesDataGrid,
} from './types'
import {
  fetchRegistrationRequests,
  fetchCompanyDetail,
  fetchPage,
} from './actions'
import { initialPaginResult, PaginResult, RequestState } from 'types/MainTypes'
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
        const payloadList = payload as unknown as RegistrationRequestAPIResponse
        state.registrationRequests =
          mapRegistrationRequestResponseToDataGrid(payloadList?.content) || []
        //state.registrationRequests = payloadList.content
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
    builder.addCase(fetchPage.pending, (state) => {
      state.data = initialPaginResult
      state.request = RequestState.SUBMIT
      state.error = ''
    })
    builder.addCase(fetchPage.fulfilled, (state, { payload }) => {
      state.data = payload
      state.request = RequestState.OK
      state.error = ''
    })
    builder.addCase(fetchPage.rejected, (state, action) => {
      state.data = initialPaginResult
      state.request = RequestState.ERROR
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

export const itemsSelector = (state: RootState): PaginResult<InvitesDataGrid> =>
  state.admin.registration.data

const Slice = { slice }

export default Slice
