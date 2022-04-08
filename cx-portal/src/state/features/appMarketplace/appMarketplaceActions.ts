import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from 'state/api'

const fetchApps = createAsyncThunk(
  'appMarketplace/fetchApps',
  async (token: string) => {
    try {
      // Call axios instance to get values
      if (token) {
        const appMarketplaceApi = api.AppMarketplaceApi.getInstance(token)
        return await appMarketplaceApi.getApps()
      }
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchApps api call error')
    }
  }
)

export { fetchApps }
