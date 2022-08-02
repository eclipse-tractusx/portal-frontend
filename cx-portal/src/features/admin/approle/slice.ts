import { createSlice } from '@reduxjs/toolkit'
import { AdminAppRoleState, AppRole, initialState, name } from './types'
import { fetchRoles } from './actions'
import { RootState } from 'features/store'
import { RequestState } from 'types/MainTypes'

export const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoles.pending, (state) => ({
      ...state,
      roles: [],
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchRoles.fulfilled, (state, { payload }) => ({
      ...state,
      roles: payload || [],
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(fetchRoles.rejected, (state, action) => ({
      ...state,
      roles: [],
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
  },
})

export const stateSelector = (state: RootState): AdminAppRoleState =>
  state.admin.approle

export const roleSelector = (state: RootState): AppRole[] =>
  state.admin.approle.roles

const Slice = { slice }

export default Slice
