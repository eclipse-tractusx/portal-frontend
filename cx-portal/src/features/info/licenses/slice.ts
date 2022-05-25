import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { Nullable, RequestState } from 'types/MainTypes'
import { fetchItems } from './actions'
import { initialState, LicenseType, name } from './types'

export const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => ({
      ...state,
      items: null,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchItems.fulfilled, (state, { payload }) => ({
      ...state,
      items: payload || null,
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(fetchItems.rejected, (state, action) => ({
      ...state,
      items: null,
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
  },
})

export const itemsSelector = (state: RootState): Nullable<LicenseType> =>
  state.info.licenses.items

const Slice = { slice }

export default Slice
