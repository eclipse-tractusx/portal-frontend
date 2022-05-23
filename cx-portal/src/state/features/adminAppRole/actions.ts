import { createAsyncThunk } from '@reduxjs/toolkit'
import { AdminAppRoleApi } from './apiTestdata'

const fetchItems = createAsyncThunk(
  'admin/appRole/fetchItems',
  async (appId: string) => {
    try {
      return await AdminAppRoleApi.getInstance().getItems(appId)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchItems api call error')
    }
  }
)

export { fetchItems }
