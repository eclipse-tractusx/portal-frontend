import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import { name } from './types'

const fetchItems = createAsyncThunk(`${name}/fetch`, async () => {
  try {
    return await Api.getInstance().getItems()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${name}/fetch api call error`)
  }
})

const addItem = createAsyncThunk(`${name}/add`, async (id: string) => {
  try {
    return await Api.getInstance().putItem(id)
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${name}/add api call error`)
  }
})

const removeItem = createAsyncThunk(`${name}/remove`, async (id: string) => {
  try {
    return await Api.getInstance().deleteItem(id)
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${name}/remove api call error`)
  }
})

export { fetchItems, addItem, removeItem }
