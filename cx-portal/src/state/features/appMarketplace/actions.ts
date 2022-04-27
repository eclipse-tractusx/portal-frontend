import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppMarketplaceApi } from './api'

const fetchItems = createAsyncThunk('appMarketplace/fetchItems', async () => {
  try {
    return await AppMarketplaceApi.getInstance().getItems()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error('fetchItems api call error')
  }
})

export { fetchItems }
