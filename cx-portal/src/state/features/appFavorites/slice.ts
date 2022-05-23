import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'state/store'
import { addItem, fetchItems, removeItem } from './actions'
import { InitialListState, ListState, RequestState } from 'types/MainTypes'

const initialState: ListState<string> = { ...InitialListState }

export const slice = createSlice({
  name: 'apps/favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch
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

    //add
    builder.addCase(addItem.pending, (state, action) => ({
      ...state,
      change: action.meta.arg || null,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(addItem.fulfilled, (state, action) => ({
      items: [...state.items, state.change!],
      change: null,
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(addItem.rejected, (state, action) => ({
      ...state,
      change: null,
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))

    //remove
    builder.addCase(removeItem.pending, (state, action) => ({
      ...state,
      change: action.meta.arg || null,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(removeItem.fulfilled, (state) => ({
      items: state.items.filter((a) => a !== state.change),
      change: null,
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(removeItem.rejected, (state, action) => ({
      ...state,
      change: null,
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
  },
})

export const stateSelector = (state: RootState): ListState<string> =>
  state.appFavorites

export const itemsSelector = (state: RootState): string[] =>
  state.appFavorites.items

const Slice = { slice }

export default Slice
