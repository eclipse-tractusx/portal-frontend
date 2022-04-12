import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from 'state/api'

const fetchItems = createAsyncThunk('news/fetchItems', async () => {
  try {
    return await api.NewsApi.getInstance().getItems()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error('fetchItems api call error')
  }
})

export { fetchItems }
