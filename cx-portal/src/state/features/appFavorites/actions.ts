import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'

const slice = 'apps/favorites'

const fetchItems = createAsyncThunk(`${slice}/fetch`, async () => {
  try {
    return await Api.getInstance().getItems()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${slice}/fetch api call error`)
  }
})

const addItem = createAsyncThunk(`${slice}/add`, async (id: string) => {
  try {
    return await Api.getInstance().putItem(id)
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${slice}/add api call error`)
  }
})

const removeItem = createAsyncThunk(`${slice}/remove`, async (id: string) => {
  try {
    return await Api.getInstance().deleteItem(id)
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${slice}/remove api call error`)
  }
})

export { fetchItems, addItem, removeItem }
