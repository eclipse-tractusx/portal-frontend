import { createSlice } from '@reduxjs/toolkit'
import { AdminAppRoleState, AppRole, initialState, name } from './types'
import { fetchItems } from './actions'
import { RootState } from 'features/store'
import { RequestState } from 'types/MainTypes'

export const slice = createSlice({
  name,
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
  state.admin.approle

export const itemSelector = (state: RootState): AppRole[] =>
  state.admin.approle.items

const Slice = { slice }

export default Slice
