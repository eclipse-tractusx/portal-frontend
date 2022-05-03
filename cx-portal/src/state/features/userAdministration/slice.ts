import { createSlice } from '@reduxjs/toolkit'
import {
  CompanyDetail,
  RegistrationRequestAPIResponse,
  RegistrationRequestDataGrid,
  TenantUser,
  UserAdministrationState,
} from './types'
import {
  addTenantUsers,
  fetchTenantUsers,
  fetchRegistrationRequests,
  fetchCompanyDetail,
} from './actions'
import { mapRegistrationRequestResponseToDataGrid } from 'utils/dataMapper'
import { RootState } from 'state/store'

const initialState: UserAdministrationState = {
  tenantUsers: [],
  registrationRequests: [],
  companyDetail: {} as CompanyDetail,
  addUserOpen: false,
  loading: false,
  detailLoading: false,
  error: '',
}

const userAdministrationSlice = createSlice({
  name: 'admin/user',
  initialState,
  reducers: {
    openAddUser: (state) => ({
      ...state,
      addUserOpen: true,
    }),
    closeAddUser: (state) => ({
      ...state,
      addUserOpen: false,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(addTenantUsers.pending, (state) => ({
      ...state,
      loading: true,
      error: '',
    }))
    builder.addCase(addTenantUsers.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      error: '',
    }))
    builder.addCase(addTenantUsers.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error.message as string,
    }))
    builder.addCase(fetchTenantUsers.pending, (state) => ({
      ...state,
      tenantUsers: [],
      loading: true,
      error: '',
    }))
    builder.addCase(fetchTenantUsers.fulfilled, (state, { payload }) => ({
      ...state,
      tenantUsers: payload || [],
      loading: false,
      error: '',
    }))
    builder.addCase(fetchTenantUsers.rejected, (state, action) => ({
      ...state,
      tenantUsers: [],
      loading: false,
      error: action.error.message as string,
    }))
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

export const userAdministrationSelector = (
  state: RootState
): UserAdministrationState => state.userAdministration

export const addUserOpenSelector = (state: RootState): boolean =>
  state.userAdministration.addUserOpen
export const tenantUsersSelector = (state: RootState): TenantUser[] =>
  state.userAdministration.tenantUsers
export const registrationRequestsSelector = (
  state: RootState
): RegistrationRequestDataGrid[] =>
  state.userAdministration.registrationRequests

export default userAdministrationSlice
