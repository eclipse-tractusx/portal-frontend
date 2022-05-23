import { createSlice } from '@reduxjs/toolkit'
import { AdminAppRoleState, AppRole } from './types'
import { fetchItems } from './actions'
import { RootState } from 'state/store'
import { RequestState } from 'types/MainTypes'

const initialState: AdminAppRoleState = {
  items: [],
  request: RequestState.NONE,
  error: '',
}

const adminAppRoleSlice = createSlice({
  name: 'admin/appRole',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => ({
      ...state,
      items: [],
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchItems.fulfilled, (state, { payload }) => ({
      ...state,
      items: payload || [],
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(fetchItems.rejected, (state, action) => ({
      ...state,
      items: [],
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
  },
})

export const stateSelector = (state: RootState): AdminAppRoleState =>
  state.adminAppRole

export const itemSelector = (state: RootState): AppRole[] =>
  state.adminAppRole.items

export default adminAppRoleSlice
