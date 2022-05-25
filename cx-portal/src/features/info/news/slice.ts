import { createSlice } from '@reduxjs/toolkit'
import { CardItems } from 'cx-portal-shared-components'
import { RootState } from 'features/store'
import { RequestState } from 'types/MainTypes'
import { fetchItems } from './actions'
import { initialState, name } from './types'

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

export const itemsSelector = (state: RootState): CardItems[] =>
  state.info.news.items

const Slice = { slice }

export default Slice
