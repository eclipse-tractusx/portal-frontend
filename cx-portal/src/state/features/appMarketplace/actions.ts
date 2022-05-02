import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppMarketplaceApi as Api } from './api'
import { AppMarketplaceApi as ApiMock } from './apiTestdata'

const fetchItems = createAsyncThunk('appMarketplace/fetchItems', async () => {
  try {
    return await Api.getInstance().getItems()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error('fetchItems api call error')
  }
})

const fetchSubscribed = createAsyncThunk(
  'appMarketplace/fetchSubscribed',
  async () => {
    try {
      return await ApiMock.getInstance().getSubscribed()
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchItems api call error')
    }
  }
)

export { fetchItems, fetchSubscribed }
