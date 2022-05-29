import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { RequestState } from 'types/MainTypes'
import { fetchSearch } from './actions'
import { initialState, name, SearchItem } from './types'

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    clear: (state) => ({
      ...state,
      items: [],
      request: RequestState.NONE,
      error: '',
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state) => ({
      ...state,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchSearch.fulfilled, (state, { payload }) => ({
      ...state,
      items: payload || [],
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(fetchSearch.rejected, (state, action) => ({
      ...state,
      items: [],
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
  },
})

export const searchSelector = (state: RootState): SearchItem[] =>
  state.info.search.items

const Slice = { slice }

export default Slice
