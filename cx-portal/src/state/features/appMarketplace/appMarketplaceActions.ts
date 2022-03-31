import { createAsyncThunk } from '@reduxjs/toolkit'
import { store } from 'state/store'
import { api } from 'state/api'

const fetchApps = createAsyncThunk('appMarketplace/fetchApps', async () => {
  try {
    // Call axios instance to get values
    if (store.getState().user?.token) {
      const appMarketplaceApi = api.AppMarketplaceApi.getInstance(
        store.getState().user?.token
      )
      return await appMarketplaceApi.getApps()
    }
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error('fetchApps api call error')
  }
})

export { fetchApps }
