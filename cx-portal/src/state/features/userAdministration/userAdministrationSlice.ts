import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'state/store'
import {
  RegistrationRequestAPIResponse,
  RegistrationRequestDataGrid,
  UserAdministrationInitialState,
} from 'types/userAdministration/UserAdministrationTypes'
import {
  fetchTenantUsers,
  fetchRegistrationRequests,
} from './userAdministrationActions'
import { mapRegistrationRequestResponseToDataGrid } from 'utils/dataMapper'

const initialState: UserAdministrationInitialState = {
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
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchTenantUsers.fulfilled, (state, { payload }) => {
      state.tenantUsers = payload || []
      state.loading = false
      state.error = ''
    })
    builder.addCase(fetchTenantUsers.rejected, (state, action) => {
      state.tenantUsers = []
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
        state.registrationRequests = mapRegistrationRequestResponseToDataGrid(
          payloadList
        ) as Array<RegistrationRequestDataGrid>
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

export const selectorUserAdministration = (
  state: RootState
): UserAdministrationInitialState => state.userAdministration
export default userAdministrationSlice
