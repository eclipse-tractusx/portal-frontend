import { createSlice } from '@reduxjs/toolkit'
import {
  RegistrationRequestAPIResponse,
  RegistrationRequestDataGrid,
  UserAdministrationState,
} from './types'
import { fetchTenantUsers, fetchRegistrationRequests } from './actions'
import { mapRegistrationRequestResponseToDataGrid } from 'utils/dataMapper'
import { RootState } from 'state/store'

const initialState: UserAdministrationState = {
  tenantUsers: [],
  registrationRequests: [],
  loading: true,
  error: '',
}

const userAdministrationSlice = createSlice({
  name: 'userAdministration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTenantUsers.pending, (state) => {
      state.tenantUsers = []
      state.registrationRequests = []
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchTenantUsers.fulfilled, (state, { payload }) => {
      state.tenantUsers = payload || []
      state.registrationRequests = []
      state.loading = false
      state.error = ''
    })
    builder.addCase(fetchTenantUsers.rejected, (state, action) => {
      state.tenantUsers = []
      state.registrationRequests = []
      state.loading = false
      state.error = action.error.message as string
    })
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
  },
})

export const userAdministrationSelector = (
  state: RootState
): UserAdministrationState => state.userAdministration

export default userAdministrationSlice
