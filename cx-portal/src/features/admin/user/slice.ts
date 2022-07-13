import { createSlice } from '@reduxjs/toolkit'
import {
  TenantUser,
  AdminUserState,
  AddUser,
  name,
  initialState,
} from './types'
import { addTenantUsers, fetchTenantUsers } from './actions'
import { RootState } from 'features/store'
import { RequestState } from 'types/MainTypes'

export const slice = createSlice({
  name,
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
    builder.addCase(addTenantUsers.fulfilled, (state) => ({
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
      tenantUsers: payload.content || [],
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

export const stateSelector = (state: RootState): AdminUserState =>
  state.admin.user

export const addOpenSelector = (state: RootState): boolean =>
  state.admin.user.addOpen

export const tenantUsersSelector = (state: RootState): TenantUser[] =>
  state.admin.user.tenantUsers

export const usersToAddSelector = (state: RootState): AddUser[] =>
  state.admin.user.usersToAdd

export const getRequestStateSelector = (state: RootState): RequestState =>
  state.admin.user.getRequest

export const addRequestStateSelector = (state: RootState): RequestState =>
  state.admin.user.addRequest

const Slice = { slice }

export default Slice
