import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppMarketplaceApi as Api } from './api'
import { AppMarketplaceApi as ApiMock } from './apiTestdata'

const fetchItems = createAsyncThunk('apps/fetchItems', async () => {
  try {
    return await Api.getInstance().getItems()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error('fetchItems api call error')
  }
})

const fetchLatest = createAsyncThunk('apps/fetchLatest', async () => {
  try {
    return await ApiMock.getInstance().getLatest()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error('fetchLatest api call error')
  }
})

const fetchFavorites = createAsyncThunk('apps/fetchFavorites', async () => {
  try {
    return await ApiMock.getInstance().getFavorites()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error('fetchFavorites api call error')
  }
})

const fetchSubscribed = createAsyncThunk(
  'appMarketplace/fetchSubscribed',
  async (all?: boolean) => {
    try {
      return await ApiMock.getInstance().getSubscribed(all)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchSubscribed api call error')
    }
  }
)

export { fetchItems, fetchLatest, fetchFavorites, fetchSubscribed }
