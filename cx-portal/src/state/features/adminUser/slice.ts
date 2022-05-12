import { createSlice } from '@reduxjs/toolkit'
import { TenantUser, AdminUserState, AddUser } from './types'
import { addTenantUsers, fetchTenantUsers } from './actions'
import { RootState } from 'state/store'
import { RequestState } from 'types/MainTypes'

const initialState: AdminUserState = {
  tenantUsers: [],
  usersToAdd: [],
  getRequest: RequestState.NONE,
  addRequest: RequestState.NONE,
  addOpen: false,
  error: '',
}

const adminUserSlice = createSlice({
  name: 'admin/user',
  initialState,
  reducers: {
    openAdd: (state) => ({
      ...state,
      addOpen: true,
      addRequest: RequestState.NONE,
    }),
    closeAdd: (state) => ({
      ...state,
      addOpen: false,
    }),
    setUsersToAdd: (state, action) => ({
      ...state,
      usersToAdd: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(addTenantUsers.pending, (state) => ({
      ...state,
      addRequest: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(addTenantUsers.fulfilled, (state, { payload }) => ({
      ...state,
      addRequest: RequestState.OK,
      error: '',
    }))
    builder.addCase(addTenantUsers.rejected, (state, action) => ({
      ...state,
      addRequest: RequestState.ERROR,
      error: action.error.message as string,
    }))
    builder.addCase(fetchTenantUsers.pending, (state) => ({
      ...state,
      tenantUsers: [],
      getRequest: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchTenantUsers.fulfilled, (state, { payload }) => ({
      ...state,
      tenantUsers: payload || [],
      getRequest: RequestState.OK,
      error: '',
    }))
    builder.addCase(fetchTenantUsers.rejected, (state, action) => ({
      ...state,
      tenantUsers: [],
      getRequest: RequestState.ERROR,
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

export const usersToAddSelector = (state: RootState): AddUser[] =>
  state.adminUser.usersToAdd

export const getRequestStateSelector = (state: RootState): RequestState =>
  state.adminUser.getRequest

export const addRequestStateSelector = (state: RootState): RequestState =>
  state.adminUser.addRequest

export default adminUserSlice
