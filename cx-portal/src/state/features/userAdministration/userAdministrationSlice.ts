import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'state/store'
import { UserAdministrationInitialState } from 'types/userAdministration/UserAdministrationTypes'
import { fetchTenantUsers } from './userAdministrationActions'

const initialState: UserAdministrationInitialState = {
  tenantUsers: [],
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
  },
})

export const selectorUserAdministration = (
  state: RootState
): UserAdministrationInitialState => state.userAdministration
export default userAdministrationSlice
