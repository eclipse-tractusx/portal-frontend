import { createSlice } from '@reduxjs/toolkit'
import { TenantUser, AdminUserState } from './types'
import { addTenantUsers, fetchTenantUsers } from './actions'
import { RootState } from 'state/store'

const initialState: AdminUserState = {
  tenantUsers: [],
  addUsers: [],
  addOpen: false,
  loading: false,
  error: '',
}

const adminUserSlice = createSlice({
  name: 'admin/user',
  initialState,
  reducers: {
    openAdd: (state) => ({
      ...state,
      addOpen: true,
    }),
    closeAdd: (state) => ({
      ...state,
      addOpen: false,
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
  },
})

export const userAdministrationSelector = (state: RootState): AdminUserState =>
  state.adminUser

export const addOpenSelector = (state: RootState): boolean =>
  state.adminUser.addOpen

export const tenantUsersSelector = (state: RootState): TenantUser[] =>
  state.adminUser.tenantUsers

export default adminUserSlice
