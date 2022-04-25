import { createAsyncThunk } from '@reduxjs/toolkit'
import { NewsApi } from './apiTestdata'

const fetchItems = createAsyncThunk('news/fetchItems', async () => {
  try {
    return await NewsApi.getInstance().getItems()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error('fetchItems api call error')
  }
})

export { fetchItems }
