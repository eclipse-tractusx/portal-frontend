import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { addItem, fetchItems, removeItem } from './actions'
import { InitialListState, ListState, RequestState } from 'types/MainTypes'
import { name } from './types'
import { SubscriptionStatus, SubscriptionStatusItem } from '../apiSlice'

const initialState: ListState<SubscriptionStatusItem> = { ...InitialListState }

const pendingCase = (
  state: ListState<SubscriptionStatusItem>,
  action: any
) => ({
  ...state,
  change: action.meta.arg || null,
  request: RequestState.SUBMIT,
  error: '',
})

const rejectedCase = (
  state: ListState<SubscriptionStatusItem>,
  action: any
) => ({
  ...state,
  change: null,
  request: RequestState.ERROR,
  error: action.error.message as string,
})

export const slice = createSlice({
  name,
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
    builder.addCase(addItem.pending, pendingCase)
    builder.addCase(addItem.fulfilled, (state) => ({
      items: [...state.items, state.change!],
      change: null,
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(addItem.rejected, rejectedCase)

    //remove
    builder.addCase(removeItem.pending, pendingCase)
    builder.addCase(removeItem.fulfilled, (state) => ({
      items: state.items.filter((a) => a !== state.change),
      change: null,
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(removeItem.rejected, rejectedCase)
  },
})

export const stateSelector = (state: RootState): ListState<string> =>
  state.apps.subscribed

export const itemsSelector = (state: RootState): SubscriptionStatusItem[] =>
  state.apps.subscribed.items

export const activeItemsSelector = (state: RootState): string[] =>
  state.apps.subscribed.items
    .filter(
      (item: SubscriptionStatusItem) =>
        item.appSubscriptionStatus === SubscriptionStatus.ACTIVE
    )
    .map((item: SubscriptionStatusItem) => item.appId)

const Slice = { slice }

export default Slice
